import os
import re
import sqlite3 as sql
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
from dotenv import load_dotenv 

load_dotenv()

app = App(token=os.environ.get("SLACK_AAAAA_BOT_TOKEN"))

db_match = "data_2026.db"
db_global = "global.db"

with sql.connect(db_global) as conn_global:
    cur_global = conn_global.cursor()
    event_game = cur_global.execute("SELECT value FROM config WHERE key='event'").fetchone()[0]

upload_time = 0
bot_state_map = {
    2: "had a *Comms Issue*",
    3: "had *Power Issues*",
    4: "had a *Major Malfunction*",
    5: "*Fell Over*",
    6: "*Did Not Show*",
}

def process_team_query(text, say, thread_ts=None):
    clean_text = re.sub(r"<@.*?>", "", text).strip()

    try:
        team_id = int(clean_text)
    except (ValueError, TypeError):
        say(text="Please provide a valid team number.", thread_ts=thread_ts)
        return

    with sql.connect(db_match) as conn:
        cur = conn.cursor()
        team_info = cur.execute(
            "SELECT Match, BotState, Comment FROM match "
            "WHERE UploadTime > ? AND Event = ? AND Team = ? AND BotState > 1", 
            (upload_time, event_game, team_id)
        ).fetchall()

    if not team_info:
        say(text=f"No issues found for Team {team_id}.", thread_ts=thread_ts)
        return

    reply = f"Team {team_id} had the following issues:"
    for info in team_info:
        status = bot_state_map.get(info[1], "had an unknown issue")
        reply += f"\n• In match {info[0]}, they {status}: {info[2]}"
    
    say(text=reply, thread_ts=thread_ts)

@app.event("app_mention")
def handle_mentions(event, say):
    parent_id = event.get("ts") 
    process_team_query(event.get("text"), say, thread_ts=parent_id)

@app.message(re.compile(".*"))
def handle_dms(message, say):
    if message.get("channel_type") == "im":
        process_team_query(message.get("text"), say)

if __name__ == "__main__":
    handler = SocketModeHandler(app, os.environ.get("SLACK_AAAAA_APP_TOKEN"))
    print("AAAAA Bot is running")
    handler.start()