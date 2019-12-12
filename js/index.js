

let getKnockedPins = (standingPins) => {
    return Math.round(Math.random() * standingPins);
}

let game = () => {
    let frames = {};
    let scores = [];
    document.querySelector('.table').innerHTML = '';

    for (let frame = 1; frame <= 10; frame++) {

        let standingPins = 10;
        let pinsKnockedFirstBowl = getKnockedPins(standingPins);
        frames[frame] = {};
        frames[frame].bowl1 = pinsKnockedFirstBowl;
        standingPins = standingPins - pinsKnockedFirstBowl;

        let pinsKnockedSecondBowl = 0;
        //if there are still standing pins after first bowl then do second bowl
        if (standingPins > 0) {
            pinsKnockedSecondBowl = getKnockedPins(standingPins);
        }
        frames[frame].bowl2 = pinsKnockedSecondBowl;

        if (frames[frame].bowl1 == 10) {

            frames[frame].kind = 'strike';

        } else if (frames[frame].bowl1 + frames[frame].bowl2 == 10) {

            frames[frame].kind = 'spare';

        } else {

            frames[frame].kind = 'regular';
        }
        scores.push(frames[frame].bowl1 + frames[frame].bowl2);
        frames[frame].score = frames[frame].bowl1 + frames[frame].bowl2;

        if (frame >= 2 && frames[frame - 1].kind == 'spare') {
            scores[frame - 1 - 1] = frames[frame - 1].score + frames[frame].bowl1;
        }
        if (frame >= 2 && frames[frame - 1].kind == 'strike') {
            scores[frame - 1 - 1] = frames[frame - 1].score + frames[frame].bowl1 + frames[frame].bowl2;
        }
    }

    // Render a table

    let runningTotal = 0;

    for (let frame = 1; frame <= 10; frame++) {
        runningTotal = runningTotal + scores[frame - 1];
        console.log(runningTotal);
        const markup = `
            <div id="card">
                <div class="frame">${frame}</div>
                <div class="sec">
                    <div class="sec-1">${frames[frame].bowl1}</div>
                                        
                    <div class="sec-2">${frames[frame].kind == 'strike' ? 'X'
                : frames[frame].kind == 'spare' ? '/'
                    : frames[frame].bowl2}</div>
                </div>

                <div class="body">${runningTotal}</div>
            </div>
        `
        document.querySelector('.table').insertAdjacentHTML('beforeend', markup);
    }
    console.log(frames);
    console.log(scores);
}


document.getElementById('bowl').addEventListener('click', game);