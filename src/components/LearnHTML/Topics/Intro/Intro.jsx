import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Intro() {
    const user = useSelector((store) => store.user);
    const history = useHistory()
    return (
        <div className="container">
            <h1>Intro</h1>
            <p>“Yes?” I say. “Timothy?”“You’re a dufus.”“Oh leave Patrick alone,” Evelyn says. “He’s the boy next door.That’s Patrick. You’re not a dufus, are you, honey?” Evelyn is on Marsand I move toward the bar to make myself another drink.“Boy next door.” Tim smirks and nods, then reverses his expressionand hostilely asks Evelyn again if she has a lint brush.Evelyn finishes opening the Japanese beer bottles and tellsCourtney to fetch Stash and Vanden. “We have to eat this now or elsewe’re going to be poisoned,” she murmurs, slowly moving her head,taking in the kitchen, making sure she hasn’t forgotten anything.“If I can tear them away from the latest Megadeth video,” Courtneysays before exiting.“I have to talk to you,” Evelyn says.“What about?” I come up to her.“No,” she says and then pointing at Tim, “to Price.”Tim still glares at her fiercely. I say nothing and stare at Tim’sdrink.“Be a hon,” she tells me, “and place the sushi on the table. Tempurais in the microwave and the sake is just about done boiling.…” Hervoice trails off as she leads Price out of the kitchen.I am wondering where Evelyn got the sushi—the tuna, yellowtail,mackerel, shrimp, eel, even
                bonito
                , all seem so fresh and there arepiles of wasabi and clumps of ginger placed strategically around theWilton platter—but I also like the idea that I
                don’t
                know, will
                never
                know, will never
                ask
                where it came from and that the sushi will sitthere in the middle of the glass table from Zona that Evelyn’s fatherbought her like some mysterious apparition from the Orient and as Iset the platter down I catch a glimpse of my reflection on the surfaceof the table. My skin seems darker because of the candlelight and Inotice how good the haircut I got at Gio’s last Wednesday looks. Imake myself another drink. I worry about the sodium level in the soysauce.Four of us sit around the table waiting for Evelyn and Timothy toreturn from getting Price a lint brush. I sit at the head taking largeswallows of J&B. Vanden sits at the other end reading disinterestedlyfrom some East Village rag called
                Deception
                , its glaring headline
                THE

                DEATH OF DOWNTOWN
                . Stash has pushed a chopstick into a lone piece of yellowtail that lies on the middle of his plate like some shiny impaledinsect and the chopstick stands straight up. Stash occasionally movesthe piece of sushi around the plate with the chopstick but never looksup toward either myself or Vanden or Courtney, who sits next to mesipping plum wine from a champagne glass.Evelyn and Timothy come back perhaps twenty minutes after we’veseated ourselves and Evelyn looks only slightly flushed. Tim glares atme as he takes the seat next to mine, a fresh drink in hand, and heleans over toward me, about to say, to admit something, whensuddenly Evelyn interrupts, “Not there, Timothy,” then, barely awhisper, “Boy girl, boy girl.” She gestures toward the empty chairnext to Vanden. Timothy shifts his glare to Evelyn and hesitantly takesthe seat next to Vanden, who yawns and turns a page of hermagazine.“Well, everybody,” Evelyn says, smiling, pleased with the meal shehas presented, “dig in,” and then after noticing the piece of sushi thatStash has pinned—he’s now bent low over the plate, whispering at it—her composure falters but she smiles bravely and chirps, “Plumwine anyone?”No one says anything until Courtney, who is staring at Stash’s plate,lifts her glass uncertainly and says, trying to smile, “It’s … delicious,Evelyn.”Stash doesn’t speak. Even though he is probably uncomfortable atthe table with us since he looks nothing like the other men in theroom—his hair isn’t slicked back, no suspenders, no horn-rimmedglasses, the clothes black and ill-fitting, no urge to light and suck on acigar, probably unable to secure a table at Camols, his net worth apittance—still, his behavior lacks warrant and he sits there as if hypnotized by the glistening piece of sushi and just as the table isabout to finally ignore him, to look away and start eating, he sits upand loudly says, pointing an accusing finger at his plate, “It moved!”Timothy glares at him with a contempt so total that I can’t fullyequal it but I muster enough energy to come close. Vanden seemsamused and so now, unfortunately, does Courtney, who I’m beginningto think finds this monkey attractive but I suppose if I were datingLuis Carruthers I might too. Evelyn laughs good-naturedly and says,“Oh Stash, you
                are
                a riot,” and then asks worriedly, “Tempura?”</p>
            <button onClick={() => {
                console.log('finished');

                // Stops user from backwards progression

                user.recent_topic_completed > 1 ? '' : axios.post('/api/user/next-topic', {username: user.username, nextTopic: 1})
                history.push('/progression')
                }
            }
            >Finish Topic</button>
        </div >
    );
}

export default Intro;