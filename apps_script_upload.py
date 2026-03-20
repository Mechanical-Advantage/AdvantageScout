import requests
import pandas as pd
import json
import time

WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxW7G7LohdgbakIaaYVGb-levYexVUz-glf7goQ-hqSULSY7tVEXyXGwKNgZ5Q646j5KQ/exec"
PASSWORD = "MA6328"

CHUNK_SIZE = 200
SLEEP_BETWEEN = 2.5
MAX_RETRIES = 4


def post_chunk(payload: dict, chunk_label: str) -> bool:
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.post(WEB_APP_URL, json=payload)
            result = response.json()

            if result.get("status") == "success":
                print(f"  ✓ {chunk_label} — {result.get('message', 'ok')}")
                return True
            else:
                print(f"  ✗ {chunk_label} — Server error: {result.get('message')}")
                return False

        except json.JSONDecodeError:
            raw = response.text[:300] if "response" in dir() else "(no response)"
            wait = 2**attempt
            print(
                f"  ! {chunk_label} attempt {attempt + 1}: Bad JSON — retrying in {wait}s"
            )
            print(f"    Raw: {raw}")
            time.sleep(wait)

        except requests.exceptions.RequestException as exc:
            wait = 2**attempt
            print(
                f"  ! {chunk_label} attempt {attempt + 1}: {exc} — retrying in {wait}s"
            )
            time.sleep(wait)

    print(f"  ✗ {chunk_label} — FAILED after {MAX_RETRIES} attempts")
    return False


def upload_csv(csv_path: str, sheet_name: str = "Data", finalize_doc: bool = True):
    df = pd.read_csv(csv_path).fillna("")
    headers = df.columns.tolist()
    total_rows = len(df)

    print(f"Uploading '{csv_path}' → sheet '{sheet_name}'")
    print(
        f"  {total_rows} rows | chunk size {CHUNK_SIZE} | ~{-(-total_rows // CHUNK_SIZE)} chunks\n"
    )

    failed_chunks = []

    for i in range(0, total_rows, CHUNK_SIZE):
        chunk_df = df.iloc[i : i + CHUNK_SIZE]
        rows_to_send = chunk_df.values.tolist()
        is_first = i == 0

        if is_first:
            rows_to_send = [headers] + rows_to_send

        payload = {
            "password": PASSWORD,
            "tableName": sheet_name,
            "rows": rows_to_send,
            "clear": is_first,
        }

        end = min(i + CHUNK_SIZE, total_rows)
        label = f"rows {i}–{end}"

        success = post_chunk(payload, label)
        if not success:
            failed_chunks.append(label)

        if i + CHUNK_SIZE < total_rows:
            time.sleep(SLEEP_BETWEEN)

    print()
    if failed_chunks:
        print(f"⚠ Upload finished with {len(failed_chunks)} failed chunk(s):")
        for c in failed_chunks:
            print(f"    • {c}")
        print("  Skipping Doc finalization due to incomplete data.")
        return

    print("✓ All chunks uploaded to Sheet successfully.")

    if finalize_doc:
        print("\nFinalizing Google Doc table (single rebuild from Sheet data)…")
        finalize_payload = {
            "password": PASSWORD,
            "tableName": sheet_name,
            "finalizeDoc": True,
        }
        success = post_chunk(finalize_payload, "Doc finalize")
        if success:
            print("✓ Google Doc updated.")
        else:
            print("✗ Doc finalization failed — Sheet data is still complete.")

    print("\n── Upload complete ──")


if __name__ == "__main__":
    upload_csv(
        csv_path="match.csv",
        sheet_name="Data",
        finalize_doc=False,
    )
    upload_csv(
        csv_path="pit.csv",
        sheet_name="Pit",
        finalize_doc=False,
    )
    upload_csv(
        csv_path="super.csv",
        sheet_name="Super",
        finalize_doc=False,
    )
