    var gameArea = $(".appFrame");
    var timer = 20;


    $(document).on('click', '#restart', function(e) {
        game.reset();
      });

      $(document).on('click', '.answers', function(e) {
        game.clicked(e);
      });
      
      $(document).on('click', '#start', function(e) {
        $('#remainingTime').append('<h2>Time Remaining:' + '<span id="timer">20</span>' + 'Seconds</h2>');
        game.loadQuestion();
      });


    // giving variable questions the value and answers of each question 

    var questions= [{
        question: "What does DOM stand for?",
        answers: ["Digital Optical Module", "Document Object Model", "Days On Market", "Display On Monitor"],
        rightAnswer: "Document Object Model",
      }, {
        question: "What is the meaning of NAN?",
        answers: ["grandma", "infinity", "not a number", "Javascript function"],
        rightAnswer: "not a number",
      }, {
        question: "What does Query Selector do?",
        answers: ["links JQuery", "selects all jquery code", "returns the first element that matches a specified CSS selector(s) in the document", "manipulates the DOM"],
        rightAnswer: "returns the first element that matches a specified CSS selector(s) in the document",
      }, {
        question: "How do you add an element to the end of an array?",
        answers: [".push()", ".pop()", ".shift()", ".push()"],
        rightAnswer: ".push()",
      }, {
        question: "What would the following code return? console.log(typeof typeof 1);",
        answers: ["string", "number", "undefined", "boolean"],
        rightAnswer: "string",
      }, {
        question: "What kind of programming is used in Javascript?",
        answers: ["polymorphic", "OOP", "functional", "assembly"],
        rightAnswer: "functional",
      }, {
        question: "What is a boolean?",
        answers: ["a type of array", "true or false statement", "#ffff", "does not apply to Javascript"],
        rightAnswer: "true or false statement",
      }, {
        question: "How do you break Javascript into multiple lines?",
        answers: ["Enter key", "<br>", "//", "/n"],
        rightAnswer: "/n",
      }, {
        question: "What company developed Javascript?",
        answers: ["Microsoft", "NetScape", "IBM", "Dell"],
        rightAnswer: "NetScape",
      }];


      var game = {
        questions:questions,
        currentQuestion:0,
        counter:timer,
        right:0,
        wrong:0,
        countdown: function(){
          game.counter--;
          $('#timer').html(game.counter);
      
          if (game.counter === 0){
            game.timeUp();
          }
        },
        loadQuestion: function(){
          timer = setInterval(game.countdown, 20000);
          $("#remainingTime").html('<h3> Seconds remaining' + game.counter +'</h3>');
          gameArea.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
          for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
            gameArea.append('<button class="answers" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
          }
        },
        nextQuestion: function(){
          game.counter = timer;
          $('#timer').html(game.counter);
          game.currentQuestion++;
          game.loadQuestion();
          },
        timeUp: function (){
          clearInterval(timer);
          $('#timer').html(game.counter);
      
          gameArea.html('<h2>Out of Time!</h2>');
          gameArea.append('<h3>The right Answer was: ' + questions[this.currentQuestion].rightAnswer);      
          if (game.currentQuestion === questions.length - 1){
            setTimeout(game.results, 3 * 1000);
          } else {
            setTimeout(game.nextQuestion, 3 * 1000);
          }
        },
        results: function() {
          clearInterval(timer);
      
          gameArea.html('<h2>All done, heres how you did!</h2>');
          $('#timer').html(game.counter);
          gameArea.append('<h3>right Answers: ' + game.right + '</h3>');
          gameArea.append('<h3>wrong Answers: ' + game.wrong + '</h3>');
          gameArea.append('<h3>Unanswered: ' + (questions.length - (game.wrong + game.right)) + '</h3>');
          gameArea.append('<br><button id="restart">Start Over?</button>');
        },
        clicked: function(e) {
          clearInterval(timer);
      
          if ($(e.target).data("name") === questions[this.currentQuestion].rightAnswer){
            this.rightAnswer();
          } else {
            this.wrongAnswer();
          }
        },
        wrongAnswer: function() {
          game.wrong++;
          clearInterval(timer);
          gameArea.html('<h2>Wrong!</h2>');
          gameArea.append('<h3>The right Answer was: ' + questions[game.currentQuestion].rightAnswer + '</h3>');      
          if (game.currentQuestion === questions.length - 1){
            setTimeout(game.results, 3 * 1000);
          } else {
            setTimeout(game.nextQuestion, 3 * 1000);
          }
        },
        rightAnswer: function(){
          clearInterval(timer);
          game.right++;
          gameArea.html('<h2>Right!</h2>');
                
          if (game.currentQuestion === questions.length - 1){
            setTimeout(game.results, 3 * 1000);
          } else {
            setTimeout(game.nextQuestion, 3 * 1000);
          }
        },
        reset: function(){
          this.currentQuestion = 0;
          this.counter = timer;
          this.right = 0;
          this.wrong = 0;
          this.loadQuestion();
        }
      };

