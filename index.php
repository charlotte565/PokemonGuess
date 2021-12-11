<!DOCTYPE html>
<meta charset="utf-8" />
<html>

<head>
    <title>Guess that Pokemon!</title>
    <link rel="stylesheet" href="style.css" />
</head>

<h1>Who's that Pokemon?</h1>

<input type="text" id="player_input" placeholder="Enter player name">
<input type="button" value="submit" id="player_submit">

<p id="play_name">Player Name: no name</p>



<body>



    <!-- <p id="pokeNum"></p>
    <p id="pokeName"></p>
    <p id="wrongoption1"></p>
    <p id="wrongoption2"></p>
    <p id="wrongoption3"></p> -->

    <div class="row">
        <div class="column left">
            <form>

                <input type="button" id="option1" class="optionButton">
                <input type="button" id="option2" class="optionButton">
                <input type="button" id="option3" class="optionButton">
                <input type="button" id="option4" class="optionButton">

            </form>
        </div>
        <div class="column middle">
            <div id="canvas_container">
                <img src="background.png" alt="guess the pokemon" width="300">

                <canvas id="canvas"></canvas>

            </div>
            <p id="feedback_label">Take a guess!</p>
            <p id="current_score">Current Score: 0</p>
            <input type="button" value="Reset" id="reset">

            <button id="speaker"> <img src="speaker off.png" width="20px" alt="audio or/off" id="speaker_img"></button>
            <button id="play"> <img src="play-button.png" width="20px" alt="play"></button>
        </div>

        <audio id="cry" src="audio/1.ogg">
            Your browser does not support the
            <code>audio</code> element.
        </audio>


        <div id="stats" class="column right">
            <h4>HIGHSCORE</h4>
            <ol id="highscore">
                <?php
                $jsonobject = file_get_contents('stats.json');
                $json = json_decode($jsonobject, true);

                $streaks = $json['streaks'];
                $count = 1;


                foreach ($streaks as $rank => $value){
                    if($count!=10){
                    ?><li id="rank " $count><?php echo  $value['name'] , ", Score: ", $value['score'] ?></li><?php
                    $count++;
                    }
                }
                if($count<10){
                    for($count; $count <= 10 ; $count++ ){
                        ?><li id="rank " $count></li><?php
                    }
                }
                ?>


            </ol>

          <?php $str_json = file_get_contents('php://input');
          

          if($str_json!=null){

            $json = json_decode($str_json, true);

            $upload = json_encode($json, true);

            file_put_contents("stats.json", $upload);
          }
                
          
          ?>


        </div>
    </div>

</body>

<script src="main.js"></script>

</html>