$(document).ready(function() {

    var topic="Dining Philosopher";

    $('#side_top_navbar').load('../base.html', function(){
        $('.left').html(topic);
    });

    particlesJS.load('particles-js', '../particles.json', function() {
      console.log('particles.json config loaded');
  });

  // Selectors
  var $stepn = $('#step-n');
  var $stepnext = $('#step-next');
  var $stepprev = $('#step-prev');

  var $status = $('#status');
  var $eating_philosopher = $('#eating_philosopher');

  // Initializes number of current step
  var step = 1;

  // JSON object for the steps of simulation
  var steps = [
  {
    philosophers: [0,0,0,0,0],
    chopsticks: [0,0,0,0,0],
    mutex: 0,
    waiting: 0,
    chair: '',
    status: 'All are thinking...'
  },
  {
    philosophers: [2,0,0,0,0],
    chopsticks: [0,0,0,0,0],
    mutex: 1,
    waiting: 0,
    chair: '',
    status: 'Philosopher #1 feels hungry.'
  },
  {
    philosophers: [2,0,0,2,0],
    chopsticks: [0,0,0,0,0],
    mutex: 0,
    waiting: 1,
    chair: '',
    status: 'Philosopher #4 feels hungry.'
  },
  {
    philosophers: [2,0,0,2,0],
    chopsticks: [0,0,1,1,0],
    mutex: 1,
    waiting: 1,
    chair: '',
    status: 'Philosopher #4 takes chopsticks #3 and #4.'
  },
  {
    philosophers: [2,0,0,1,0],
    chopsticks: [0,0,1,1,0],
    mutex: 0,
    waiting: 0,
    chair: 'Philosopher #4',
    status: 'Philosopher #4 is eating.'
  },
  {
    philosophers: [2,0,0,1,0],
    chopsticks: [1,0,1,1,1],
    mutex: 1,
    waiting: 0,
    chair: 'Philosopher #4',
    status: 'Philosopher #1 takes chopsticks #1 and #5.'
  },
  {
    philosophers: [1,0,0,1,0],
    chopsticks: [1,0,1,1,1],
    mutex: 1,
    waiting: 0,
    chair: 'Philosopher #4, #1',
    status: 'Philosopher #1 is eating.'
  },

  {
    philosophers: [1,0,0,1,2],
    chopsticks: [1,0,1,1,1],
    mutex: 0,
    waiting: 1,
    chair: 'Philosopher #4, #1',
    status: 'Philosopher #5 feels hungry.'
  },
  {
    philosophers: [1,0,0,1,2],
    chopsticks: [1,0,1,1,1],
    mutex: 1,
    waiting: 1,
    chair: 'Philosopher #4, #1',
    status: 'Philosopher #5 tries to take chopsticks.'
  },
  {
    philosophers: [1,0,0,1,2],
    chopsticks: [1,0,1,1,1],
    mutex: 0,
    waiting: 2,
    chair: 'Philosopher #4, #1',
    status: 'As chopsticks #5 and #1 are already taken by Philosopher #1 and #4, Philosopher #5 can\'t eat.'
  },
  {
    philosophers: [1,0,0,1,2],
    chopsticks: [1,0,1,1,1],
    mutex: 1,
    waiting: 2,
    chair: 'Philosopher #4, #1',
    status: 'Philosopher #5 is hungry.'
  },
  {
    philosophers: [0,0,0,1,2],
    chopsticks: [1,0,1,1,1],
    mutex: 0,
    waiting: 3,
    chair: 'Philosopher #4',
    status: 'Philosopher #1 finishes eating.'
  },
  {
    philosophers: [0,0,0,1,2],
    chopsticks: [0,0,1,1,0],
    mutex: 0,
    waiting: 3,
    chair: 'Philosopher #4',
    status: 'Philosopher #1 releases the chopsticks #1 and #5.'
  },
  {
    philosophers: [0,0,0,1,2],
    chopsticks: [0,0,1,1,0],
    mutex: 0,
    waiting: 3,
    chair: 'Philosopher #4',
    status: 'Philosopher #1 is thinking.'
  },
  {
    philosophers: [0,0,0,0,2],
    chopsticks: [0,0,1,1,0],
    mutex: 1,
    waiting: 3,
    chair: '',
    status: 'Philosopher #4 finishes eating.'
  },
  {
    philosophers: [0,0,0,0,2],
    chopsticks: [0,0,0,0,0],
    mutex: 0,
    waiting: 4,
    chair: '',
    status: 'Philosopher #4 releases the chopsticks #3 and #4.'
  },
  {
    philosophers: [0,0,0,0,2],
    chopsticks: [0,0,0,0,0],
    mutex: 1,
    waiting: 4,
    chair: '',
    status: 'Philosopher #4 is thinking.'
  },
  // {
  //   philosophers: [0,2,0,0,0],
  //   chopsticks: [0,0,0,0,0],
  //   mutex: 0,
  //   waiting: 3,
  //   chair: '',
  //   status: 'Philosopher #5 y, '
  // },
  {
    philosophers: [0,0,0,0,2],
    chopsticks: [1,0,0,0,1],
    mutex: 0,
    waiting: 3,
    chair: '',
    status: 'Philosopher #5 takes chopsticks #1 and #5.'
  },
  {
    philosophers: [0,0,0,0,1],
    chopsticks: [1,0,0,0,1],
    mutex: 0,
    waiting: 3,
    chair: 'Philosopher #5',
    status: 'Philosopher #5 is eating.'
  },
  {
   philosophers: [0,0,0,2,1],
    chopsticks: [1,0,0,0,1],
    mutex: 1,
    waiting: 3,
    chair: 'Philosopher #5',
    status: 'Philosopher #4 feels hungry.'
  },
  {
    philosophers: [0,0,0,2,1],
    chopsticks: [1,0,0,0,1],
    mutex: 0,
    waiting: 4,
    chair: 'Philosopher #5',
    status: 'Philosopher #4 tries to take chopsticks #3 and #4.'
  },
  {
    philosophers: [0,0,0,2,1],
    chopsticks: [1,0,0,0,1],
    mutex: 1,
    waiting: 4,
    chair: 'Philosopher #5',
    status: 'As chopstick #4 is already taken by Philosopher #5, Philosopher #4 can\'t eat.'
  },
  {
   philosophers: [0,0,0,2,1],
    chopsticks: [1,0,0,0,1],
    mutex: 0,
    waiting: 5,
    chair: 'Philosopher #5',
    status: 'Philosopher #4 is hungry.'
  },
  {
    philosophers: [0,0,0,2,0],
    chopsticks: [1,0,0,0,1],
    customers: ['Philosopher #1', 'Philosopher #2', 'Philosopher #3', 'Philosopher #4', 'Philosopher #5'],
    mutex: 1,
    waiting: 5,
    chair: '',
    status: 'Philosopher #5 finishes eating.'
  },
  {
    philosophers: [0,0,0,2,0],
    chopsticks: [0,0,0,0,0],
    mutex: 0,
    waiting: 5,
    chair: '',
    status: 'Philosopher #5 releases chopsticks #1 and #5.'
  },
  {
    philosophers: [0,0,0,2,0],
    chopsticks: [0,0,0,0,0],
    mutex: 1,
    waiting: 4,
    chair: '',
    status: 'Philosopher #5 is thinking.'
  },
  // {
  //  philosophers: [0,0,2,1,0],
  //   chopsticks: [0,0,0,0,0],
  //   mutex: 0,
  //   waiting: 4,
  //   chair: '',
  //   status: 'Philosopher #3 feels hungry.'
  // },
  // {
  //   philosophers: [0,0,0,2,0],
  //   chopsticks: [0,0,0,0,0],
  //   mutex: 0,
  //   waiting: 4,
  //   chair: '',
  //   status: 'Philosopher #4 feels hungry.'
  // },
  {
    philosophers: [0,0,0,2,0],
    chopsticks: [0,0,0,1,1],
    mutex: 0,
    waiting: 4,
    chair: '',
    status: 'Philosopher #4 takes chopsticks #3 and #4.'
  },
  {
    philosophers: [0,0,0,1,0],
    chopsticks: [0,0,1,1,0],
    mutex: 1,
    waiting: 3,
    chair: 'Philosopher #4',
    status: 'Philosopher #4 is eating.'
  },
  {
      philosophers: [0,0,2,1,0],
       chopsticks: [0,0,1,1,0],
       mutex: 0,
       waiting: 4,
      chair: 'Philosopher #4',
       status: 'Philosopher #3 feels hungry.'
  },
  {
    philosophers: [0,0,2,1,0],
    chopsticks: [0,0,1,1,0],
    waiting: 3,
    chair: 'Philosopher #4',
    status: 'Philosopher #3 tries to take chopsticks #2 and #3.'
  },
  {
    philosophers: [0,0,2,1,0],
    chopsticks: [0,0,1,1,0],
    mutex: 0,
    waiting: 3,
    chair: 'Philosopher #4',
    status: 'As chopstick #3 is already taken by Philosopher #4, Philosopher #3 can\'t eat.'
  },
  {
    philosophers: [0,0,2,1,0],
    chopsticks: [0,0,1,1,0],
    waiting: 3,
    chair: 'Philosopher #4',
    status: 'Philosopher #3 is hungry.'
  },
  {
    philosophers: [0,0,2,1,0],
    chopsticks: [0,0,0,0,0],
    mutex: 1,
    waiting: 2,
    chair: '',
    status: 'Philosopher #4 releases chopsticks #3 and #4.'
  },
  {
    philosophers: [0,0,2,0,0],
    chopsticks: [0,0,0,0,0],
    mutex: 0,
    waiting: 2,
    chair: '',
    status: 'Philosopher #4 is thinking.'
  },
  {
    philosophers: [0,0,2,0,0],
    chopsticks: [0,1,1,0,0],
    mutex: 0,
    waiting: 3,
    chair: '',
    status: 'Philosopher #3 takes chopsticks #2 and #3.'
  },
  {
    philosophers: [0,0,1,0,0],
    chopsticks: [0,1,1,0,0],
    mutex: 0,
    waiting: 3,
    chair: 'Philosopher #3',
    status: 'Philosopher #3 is eating.'
  },
  {
    philosophers: [0,0,1,0,0],
    chopsticks: [0,0,0,0,0],
    mutex: 1,
    waiting: 2,
    chair: '',
    status: 'Philosopher #3 releases chopsticks #2 and #3.'
  },
  {
    philosophers: [0,0,0,0,0],
    chopsticks: [0,0,0,0,0],
    mutex: 0,
    waiting: 2,
    chair: '',
    status: 'Philosopher #3 is thinking.'
  }
  ]

  // Loads the nth step of the simulation
  var loadStep = function(n) {

    for(var i=0;i<5;i++){
        if(steps[n-1]['chopsticks'][i]==0){
            $('#chopstick_' + (i+1)).attr('class','label label-success');
            $('#chopstick_' + (i+1)).text('Unlock');
        }
        else{
            $('#chopstick_' + (i+1)).attr('class','label label-danger');
            $('#chopstick_' + (i+1)).text('Locked');
        }
    }
    for(var i=0;i<5;i++){
        if(steps[n-1]['philosophers'][i]==0){
            $('#philosopher_' + (i+1)).attr('class','label label-default');
            $('#philosopher_' + (i+1)).text('Thinking');
        }
        else if(steps[n-1]['philosophers'][i]==1){
            $('#philosopher_' + (i+1)).attr('class','label label-success');
            $('#philosopher_' + (i+1)).text('Eating');
        }
        else{
            $('#philosopher_' + (i+1)).attr('class','label label-danger');
            $('#philosopher_' + (i+1)).text('Hungry');
        }
    }

    $status.text(steps[n-1]['status']);
    $eating_philosopher.text(function() {
      if (steps[n-1]['chair']) {
        return steps[n-1]['chair'];
      }
      else {
        return '\xa0';
      }
    });

    // Update step number in navigation buttons
    $stepn.text(step + '/' + steps.length);
  }

  // Resets visualization to the first step
  var resetVisualization = function() {
    step = 1;
    loadStep(1);
  }
  
  // Previous and next step button handlers
  $stepnext.click(function() {
    if (step < steps.length) {
      step += 1;
      loadStep(step);
    }
  });

  $stepprev.click(function() {
    if (step > 1) {
      step -= 1;
      loadStep(step);
    }
  });
  // Reset visualization after document loads
  resetVisualization();
});