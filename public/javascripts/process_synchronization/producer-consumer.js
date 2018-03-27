$(document).ready(function() {

    var topic="Producer Consumer";

    $('#side_top_navbar').load('../base.html', function(){
        $('.left').html(topic);
    });

  // Selectors
  var $stepn = $('#step-n');
  var $stepnext = $('#step-next');
  var $stepprev = $('#step-prev');
  var $producer = $('#producer');
  var $consumers = $('#consumers');
  var $consumer = $('#consumer');
  var $currentconsumer = $("#consumer-current");
  var $currentproducer = $("#producer-current");
  var $mutex = $('#mutex');
  var $empty = $('#empty');
  var $status = $('#status');
  var $fill = $('#fill');
  var $buffer = $('#buffer');

  // number of persons
  var persons = 6;

  // Initializes number of current step
  var step = 1;

  // JSON object for the steps of simulation
  var steps = [
  {
    producer: 2,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 3,
    fill: 0,
    chair: '',
    status: 'System is ready',
    active: 0,
    current_consumer: "",
    current_producer: "",
    status_producer: 2,
    status_consumer: 2
  },
  {
    producer: 0,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 2,
    fill: 0,
    chair: 'Producer #1',
    status: 'Producer #1 arrives, decrements the empty and locks the mutex',
    active: 0,
    current_consumer: "",
    current_producer: "1",
    status_producer: 0,
    status_consumer: 2
  },
  {
    producer: 1,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3',  'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 2,
    fill: 0,
    chair: 'Producer #1',
    status: 'Producer #1 produces the item.',
    active: 0,
    current_consumer: "",
    current_producer: "1",
    status_producer: 1,
    status_consumer: 2
  },
  {
    producer: 0,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 2,
    fill: 1,
    chair: 'Producer #1',
    status: 'Producer #1 releases the mutex and increments the fill',
    active: 0,
    current_consumer: "",
    current_producer: "1",
    status_producer: 0,
    status_consumer: 2
  },
  {
    producer: 2,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 2,
    fill: 1,
    chair: '',
    status: 'Producer #1 leaves',
    active: 0,
    current_consumer: "",
    current_producer: "",
    status_producer: 0,
    status_consumer: 2
  },
  {
    producer: 0,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #3'],
    mutex: 1,
    empty: 1,
    fill: 1,
    chair: 'Producer #2',
    status: 'Producer #2 arrives, decrements the empty and locks the mutex',
    active: 0,
    current_consumer: "",
    current_producer: "2",
    status_producer: 0,
    status_consumer: 2
  },
  {
    producer: 1,
     consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1',  'Producer #3'],
    mutex: 1,
    empty: 1,
    fill: 1,
    chair: 'Producer #2',
    status: 'Producer #2 produces the item.',
    active: 0,
    current_consumer: "",
    current_producer: "2",
    status_producer: 1,
    status_consumer: 2
  },
  {
    producer: 0,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #3'],
    mutex: 0,
    empty: 1,
    fill: 2,
    chair: 'Producer #2',
    status: 'Producer #2 releases the mutex and increments the fill',
    active: 0,
    current_consumer: "",
    current_producer: "2",
    status_producer: 0,
    status_consumer: 2
  },
   {
    producer: 2,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 1,
    fill: 2,
    chair: '',
    status: 'Producer #2 leaves',
    active: 0,
    current_consumer: "",
    current_producer: "",
    status_producer: 2,
    status_consumer: 2
  },
  {
    producer: 2,
     consumer: 0,
    consumers: ['Consumer #1', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 1,
    fill: 1,
    chair: 'Consumer #2',
    status: 'Consumer #2 arrives, decrements the fill and lock the mutex',
    active: 1,
    current_consumer: "2",
    current_producer: "",
    status_producer: 2,
    status_consumer: 0
  },
  {
    producer: 2,
    consumer: 1,
    consumers: ['Consumer #1',  'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 1,
    fill: 1,
    chair: 'Consumer #2',
    status: 'Consumer #2 consumes the item',
    active: 1,
    current_consumer: "",
    current_producer: "",
    status_producer: 2,
    status_consumer: 1
  },
  {
    producer: 2,
    consumer: 0,
    consumers: ['Consumer #1','Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 2,
    fill: 1,
    chair: 'Consumer #2',
    status: 'Consumer #2 releases the mutex, increments the empty.',
    active: 1,
    current_consumer: "2",
    current_producer: "",
    status_producer: 2,
    status_consumer: 0
  },
  {
    producer: 2,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 2,
    fill: 1,
    chair: '',
    status: 'Consumer #2 leaves.',
    active: 1,
    current_consumer: "",
    current_producer: "",
    status_producer: 2,
    status_consumer: 2
  },
  {
    producer: 0,
    consumer: 2,
    consumers: ['Consumer #1','Consumer #2', 'Consumer #3',  'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 1,
    fill: 1,
    chair: 'Producer #1',
    status: 'Producer #1 arrives, decrements the empty and locks the mutex',
    active: 0,
    current_consumer: "",
    current_producer: "1",
    status_producer: 0,
    status_consumer: 2
  },
  {
    producer: 1,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 1,
    fill: 1,
    chair: 'Producer #1',
    status: 'Producer #1 produces the item',
    active: 0,
    current_consumer: "",
    current_producer: "",
    status_producer: 1,
    status_consumer: 2
  },
  {
    producer: 0,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 1,
    fill: 2,
    chair: 'Producer #1',
    status: 'Producer #1 releases the mutex and increments the fill.',
    active: 0,
    current_consumer: "",
    current_producer: "1",
    status_producer: 0,
    status_consumer: 2
  },
  {
    producer: 2,
     consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 1,
    fill: 2,
    chair: '',
    status: 'Producer #1 leaves.',
    active: 0,
    current_consumer: "",
    current_producer: "",
    status_producer: 2,
    status_consumer: 2
  },
  {
    producer: 2,
    consumer: 0,
    consumers: [ 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 1,
    fill: 1,
    chair: 'Consumer #1',
    status: 'Consumer #1 arrives, drcrements the fill and locks the mutex.',
    active: 1,
    current_consumer: "1",
    current_producer: "",
    status_producer: 2,
    status_consumer: 0
  },
  {
    producer: 2,
    consumer: 0,
    consumers: ['Consumer #2', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 1,
    fill: 1,
    chair: 'Consumer #1',
    status: 'Consumer #3 arrives, tries to consume',
    active: 1,
    current_consumer: "1",
    current_producer: "",
    status_producer: 2,
    status_consumer: 0
  },
  {
    producer: 2,
    consumer: 0,
    consumers: [ 'Consumer #2',  'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 1,
    fill: 1,
    chair: 'Consumer #1',
    status: 'As consumer #1 is consuming, consumer #3 gets blocked .',
    active: 1,
    current_consumer: "1",
    current_producer: "",
    status_producer: 2,
    status_consumer: 0
  },
  {
    producer: 2,
    consumer: 1,
    consumers: [ 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 1,
    fill: 1,
    chair: 'Consumer #1',
    status: 'Consumer #1 consumes the item',
    active: 1,
    current_consumer: "1",
    current_producer: "",
    status_producer: 2,
    status_consumer: 1
  },
  {
    producer: 2,
    consumer: 0,
    consumers: ['Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 2,
    fill: 1,
    chair: 'Consumer #1',
    status: 'Consumer #1 releases the mutex, increments the empty.',
    active: 1,
    current_consumer: "1",
    current_producer: "",
    status_producer: 2,
    status_consumer: 0
  },
  {
    producer: 2,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 2,
    fill: 1,
    chair: '',
    status: 'Consumer #1 leaves.',
    active: 0,
    current_consumer: "",
    current_producer: "",
    status_producer: 2,
    status_consumer: 2
  },
  {
    producer: 2,
    consumer: 0,
    consumers: ['Consumer #1', 'Consumer #2',  'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 2,
    fill: 0,
    chair: 'Consumer #3',
    status: 'Consumer #3 arrives, drcrements the fill and locks the mutex.',
    active: 1,
    current_consumer: "3",
    current_producer: "",
    status_producer: 2,
    status_consumer: 0
  },
  {
    producer: 2,
    consumer: 1,
    consumers: ['Consumer #1', 'Consumer #2',  'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 2,
    fill: 0,
    chair: 'Consumer #3',
    status: 'Consumer #3 consumes the data.',
    active: 1,
    current_consumer: "3",
    current_producer: "",
    status_producer: 2,
    status_consumer: 1
  },
  {
    producer: 2,
    consumer: 0,
    consumers: ['Consumer #1', 'Consumer #2',  'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 3,
    fill: 0,
    chair: 'Consumer #3',
    status: 'Consumer #3 releases the mutex, increments the empty.',
    active: 1,
    current_consumer: "3",
    current_producer: "",
    status_producer: 2,
    status_consumer: 0
  },
  {
    producer: 2,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 3,
    fill: 0,
    chair: '',
    status: 'Consumer #3 leaves',
    active: 1,
    current_consumer: "",
    current_producer: "",
    status_producer: 2,
    status_consumer: 2
  },
  {
    producer: 2,
    consumer: 0,
    consumers: [ 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 3,
    fill: 0,
    chair: '',
    status: 'Consumer #1 arrives and tries to drcrements the fill.',
    active: 1,
    current_consumer: "",
    current_producer: "",
    status_producer: 2,
    status_consumer: 0
  },
  {
    producer: 2,
     consumer: 0,
    consumers: [ 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 3,
    fill: 0,
    chair: '',
    status: 'As there are no items to consume for Consumer #1, action to consume gets blocked',
    active: 1,
    current_consumer: "",
    current_producer: "",
    status_producer: 2,
    status_consumer: 0
  },
  {
    producer: 2,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 3,
    fill: 0,
    chair: '',
    status: 'Consumer #1 leaves',
    active: 1,
    current_consumer: "",
    current_producer: "",
    status_producer: 2,
    status_consumer: 2
  },
  {
    producer: 0,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2'],
    mutex: 1,
    empty: 2,
    fill: 0,
    chair: 'Producer #3',
    status: 'Producer #3 arrives, decrements the empty and locks the mutex',
    active: 0,
    current_consumer: "",
    current_producer: 3,
    status_producer: 0,
    status_consumer: 2
  },
  {
    producer: 1,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3',  'Producer #1', 'Producer #2'],
    mutex: 1,
    empty: 2,
    fill: 0,
    chair: 'Producer #3',
    status: 'Producer #3 produces the item.',
    active: 0,
    current_consumer: "",
    current_producer: "3",
    status_producer: 1,
    status_consumer: 2
  },
  {
    producer: 0,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 2,
    fill: 1,
    chair: 'Producer #3',
    status: 'Producer #3 releases the mutex and increments the fill.',
    active: 0,
    current_consumer: "",
    current_producer: "3",
    status_producer: 0,
    status_consumer: 2
  },
  {
    producer: 2,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 2,
    fill: 1,
    chair: '',
    status: 'Producer #3 leaves.',
    active: 0,
    current_consumer: "",
    current_producer: "",
    status_producer: 2,
    status_consumer: 2
  },
  {
    producer: 0,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #3'],
    mutex: 1,
    empty: 1,
    fill: 1,
    chair: 'Producer #2',
    status: 'Producer #2 arrives, decrements the empty and locks the mutex',
    active: 0,
    current_consumer: "",
    current_producer: "2",
    status_producer: 0,
    status_consumer: 2
  },
  {
    producer: 1,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3',  'Producer #1', 'Producer #3'],
    mutex: 1,
    empty: 1,
    fill: 1,
    chair: 'Producer #2',
    status: 'Producer #2 produces the item.',
    active: 0,
    current_consumer: "",
    current_producer: "2",
    status_producer: 1,
    status_consumer: 2
  },
  {
    producer: 0,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1',  'Producer #3'],
    mutex: 0,
    empty: 1,
    fill: 2,
    chair: 'Producer #2',
    status: 'Producer #2 releases the mutex and increments the fill.',
    active: 0,
    current_consumer: "",
    current_producer: "2",
    status_producer: 0,
    status_consumer: 2
  },
   {
    producer: 2,
     consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 1,
    fill: 2,
    chair: '',
    status: 'Producer #2 leaves.',
    active: 0,
    current_consumer: "",
    current_producer: "",
    status_producer: 2,
    status_consumer: 2
  },
  {
    producer: 0,
     consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 0,
    fill: 2,
    chair: 'Producer #1',
    status: 'Producer #1 arrives, decrements the empty and locks the mutex',
    active: 0,
    current_consumer: "",
    current_producer: "1",
    status_producer: 0,
    status_consumer: 2
  },
  {
    producer: 1,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3',  'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 0,
    fill: 2,
    chair: 'Producer #1',
    status: 'Producer #1 produces the item.',
    active: 0,
    current_consumer: "",
    current_producer: "1",
    status_producer: 1,
    status_consumer: 2
  },
  {
    producer: 0,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3','Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 0,
    fill: 3,
    chair: 'Producer #1',
    status: 'Producer #1 releases the mutex and increments the fill.',
    active: 0,
    current_consumer: "",
    current_producer: "1",
    status_producer: 0,
    status_consumer: 2
  },
   {
    producer: 2,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 0,
    fill: 3,
    chair: '',
    status: 'Producer #1  leaves.',
    active: 0,
    current_consumer: "",
    current_producer: "",
    status_producer: 2,
    status_consumer: 2
  },
  {
    producer: 0,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #3'],
    mutex: 0,
    empty: 0,
    fill: 3,
    chair: '',
    status: 'Producer #2 arrives, tries to decrement empty.As the buffer is full, request gets blocked.',
    active: 0,
    current_consumer: "",
    current_producer: "",
    status_producer: 0,
    status_consumer: 2
  },
  {
    producer: 2,
    consumer: 2,
    consumers: ['Consumer #1', 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2','Producer #3'],
    mutex: 0,
    empty: 0,
    fill: 3,
    chair: '',
    status: 'Producer #2 leaves',
    active: 0,
    current_consumer: "",
    current_producer: "",
    status_producer: 2,
    status_consumer: 2
  },
  {
    producer: 2,
    consumer: 0,
    consumers: ['Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3',],
    mutex: 1,
    empty: 0,
    fill: 2,
    chair: 'Consumer #1',
    status: 'Consumer #1 arrives, drcrements the fill and locks the mutex.',
    active: 1,
    current_consumer: "1",
    current_producer: "",
    status_producer: 2,
    status_consumer: 0
  },
  {
    producer: 2,
    consumer: 1,
    consumers: [ 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 1,
    empty: 0,
    fill: 2,
    chair: 'Consumer #1',
    status: 'Consumer #1 consumes the data.',
    active: 1,
    current_consumer: "1",
    current_producer: "",
    status_producer: 2,
    status_consumer: 1
  },
  {
    producer: 2,
    consumer: 0,
    consumers: [ 'Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 1,
    fill: 2,
    chair: 'Consumer #1',
    status: 'Consumer #1 releases the mutex, increments the empty.',
    active: 1,
    current_consumer: "1",
    current_producer: "",
    status_producer: 2,
    status_consumer: 0
  },
  {
    producer: 2,
    consumer: 2,
    consumers: [ 'Consumer #1','Consumer #2', 'Consumer #3', 'Producer #1', 'Producer #2', 'Producer #3'],
    mutex: 0,
    empty: 1,
    fill: 2,
    chair: '',
    status: 'Consumer #1  leaves',
    active: 0,
    current_consumer: "",
    current_producer: "",
    status_producer: 2,
    status_consumer: 2
  }]


  // Loads the nth step of the visualization
  var loadStep = function(n) {
    // Update state table values
    $producer.text(function() {
      if (steps[n-1]['producer'] == 0) {
        return 'Waiting';
      }
      else if (steps[n-1]['producer'] == 1) {
        return 'Producing';
      }
      else {
        return 'Idle';
      }
    });

    $consumer.text(function() {
      if (steps[n-1]['consumer'] == 0) {
        return 'Waiting';
      }
      else if (steps[n-1]['consumer'] == 1) {
        return 'Consuming';
      }
      else {
        return 'Idle';
      }
    });

    $mutex.text(function() {
      if (steps[n-1]['mutex'] == 0) {
        return 'Unlocked';
      }
      else {
        return 'Locked';
      }
    });
    $empty.text(steps[n-1]['empty']);
    $fill.text(steps[n-1]['fill']);
    $status.text(steps[n-1]['status']);

    $buffer.text(function() {
      if (steps[n-1]['chair']) {
        return steps[n-1]['chair'];
      }
      else {
        return '\xa0';
      }
    });

    // Fill the buffer with currently executing
    // If a buffer is empty, put a space
    var consumers = steps[n-1]['consumers'];
    for (var i = 0; i < persons; i++) {
      $('#chair' + (i+1)).text(function() {
        if (consumers[i]) {
          return consumers[i];  
        }
        else {
          return '\xa0';
        }
      });
    }

    // Toggles the producer function's semaphore label
    if (steps[n-1]['status_producer'] == 0) {
      $('#producer-status').attr('class', 'label label-warning');
      $('#producer-status').text('Waiting');
    }
    else if(steps[n-1]['status_producer'] == 1) {
      $('#producer-status').attr('class', 'label label-success');
      $('#producer-status').text('Producing');
    }
    else {
    	$('#producer-status').attr('class', 'label label-default');
      $('#producer-status').text('None');
    }

    if (steps[n-1]['current_producer']) {
      $('#producer-current').show();
      $('#producer-current').text('producer #' + steps[n-1]['current_producer'])
    }
    else {
      $('#producer-current').hide();
    }

    // Shows the id of the current consumer function being displayed
    if (steps[n-1]['current_consumer']) {
      $('#consumer-current').show();
      $('#consumer-current').text('consumer #' + steps[n-1]['current_consumer'])
    }
    else {
      $('#consumer-current').hide();
    }

    // Toggles the consumer's semaphore label
    if (steps[n-1]['status_consumer'] == 0) {
      $('#consumer-status').attr('class', 'label label-warning');
      $('#consumer-status').text('Waiting');
    }
    else if (steps[n-1]['status_consumer'] == 1) {
      $('#consumer-status').attr('class', 'label label-success');
      $('#consumer-status').text('Consuming');
    }
    else {
      $('#consumer-status').attr('class', 'label label-default');
      $('#consumer-status').text('None');
    }

    // Toggles the active thread label
    if (steps[n-1]['active'] == 0) {
      $('#producer-active').show();
      $('#consumer-active').hide();
    }
    else {
      $('#producer-active').hide();
      $('#consumer-active').show();
    }


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