//-----------------------------
//  Game Events
//------------------------------
    export const GameEventType = {
            init: "init",
            pickup: "pickup",
            drop: "drop",
            scoreSpeaker: "scoreSpeaker",
            missSpeaker: "missSpeaker",
            move: "move",
            scoreAmp: "scoreAmp",
            missAmp: "missAmp"
        }

    export class GameEvent {
        constructor(pos, name) {
            this.pos = pos
            this.name = name
            this.prevEvent = null
            this.npos = {x:0, y:0}
            // this.npos = 
            // {
            //     x: (pos.x - virtualFieldOffsetPx.x) / virtualFieldSizePx.w,
            //     y: (pos.y - virtualFieldOffsetPx.y) / virtualFieldSizePx.h
            // } //Normalized position on a full field

            //Sanitize
            if (this.npos.x < 0)
                this.npos.x = 0.0;
            else if (this.npos.x > 1.0)
                this.npos.x = 1.0;

            if (this.npos.y < 0)
                this.npos.y = 0;
            else if (this.npos.y > 1.0)
                this.npos.y = 1.0;
        }
    }

    export class InitEvent extends GameEvent {
        constructor(pos) {
            super(pos, GameEventType.init, null);
        }
    }

    export class MoveEvent extends GameEvent {
        constructor(pos) {
            super(pos, GameEventType.move);
        }
    }

    export class PickupEvent extends GameEvent {
        constructor(pos, id = undefined) {
            super(pos, GameEventType.pickup)
            this.noteId = id
        }

        setId(id) {
            this.noteId = id
        }
    }

    export class DropEvent extends GameEvent {
        constructor(pos) {
            super(pos, GameEventType.drop)
        }
    }

    export class SpeakerScoreEvent extends GameEvent {
        constructor(pos) {
            super(pos, GameEventType.scoreSpeaker)
        }
    }

    export class SpeakerMissEvent extends GameEvent {
        constructor(pos) {
            super(pos, GameEventType.missSpeaker)
        }
    }

    export class AmpScoreEvent extends GameEvent {
        constructor(pos) {
            super(pos, GameEventType.scoreAmp)
        }
    }

    export class AmpMissEvent extends GameEvent {
        constructor(pos) {
            super(pos, GameEventType.missAmp)
        }
    }
