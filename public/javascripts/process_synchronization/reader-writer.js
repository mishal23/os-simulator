$(document).ready(function() {


  /*particlesJS.load('particles-js', '../particles.json', function() {
    console.log('particles.json config loaded');
  });*/

   /* var topic="Reader Writer";

    $('#side_top_navbar').load('../base.html', function(){
        $('.left').html(topic);
    });*/

  // Selectors
  var $stepn = $('#step-n');
  var $stepnext = $('#step-next');
  var $stepprev = $('#step-prev');

  var $writer = $('#writer');
  var $readers = $('#readers');
  var $mutex = $('#mutex');
  var $waiting = $('#waiting');
  var $status = $('#status');
  var $database = $('#database');
  var $readerCount = $("#readerCount");
  // Default number of readers
  var db_size = 5;

  // Initializes number of current step
  var step = 1;

  // JSON object for all steps of simulation
  var steps = [
  {
    writer: 0,
    readers: ['Reader #1', 'Reader #2', 'Reader #3', 'Reader #4', 'Writer'],
    no_of_readers : 4,
    mutex: 0,
    waiting: 0,
    chair: '',
    status: 'System is ready',
    active: 0,
    reader: "",
    status_writer: 0,
    status_readers: 0,
  },
  {
    writer: 1,
    readers: ['Reader #1', 'Reader #2', 'Reader #3', 'Reader #4'],
    no_of_readers : 4,
    mutex: 0,
    waiting: 0,
    chair: 'Writer',
    status: 'Writer arrives and locks the database.',
    active: 0,
    reader: "",
    status_writer: 0,
    status_readers: 2

  },
  {
    writer: 1,
    readers: ['Reader #1', 'Reader #2', 'Reader #3', 'Reader #4'],
    no_of_readers : 4,
    mutex: 0,
    waiting: 1,
    chair: 'Writer',
    status: 'Writer writes the data',
    active: 0,
    reader: "",
    status_writer: 1,
    status_readers: 2
  },
  {
    writer: 1,
    readers: ['Reader #1', 'Reader #2', 'Reader #3', 'Reader #4', 'Writer'],
    no_of_readers : 4,
    mutex: 0,
    waiting: 1,
    chair: '',
    status: 'Writer releases the database lock and leaves the database',
    active: 0,
    reader: "",
    status_writer: 1,
    status_readers: 2
  },
  {
    writer: 0,
    readers: ['Reader #1', 'Reader #2', 'Reader #4', 'Writer'],
    no_of_readers : 3,
    mutex: 1,
    waiting: 0,
    chair: 'Readers #3',
    status: 'Reader #3 arrives, locks the mutex and increments readerCount',
    active: 1,
    reader: "3",
    status_writer: 0,
    status_readers: 0
  },
  {
    writer: 0,
    readers: ['Reader #1', 'Reader #2', 'Reader #4', 'Writer'],
    no_of_readers : 3,
    mutex: 1,
    waiting: 0,
    chair: 'Readers #3',
    status: 'Reader #3 locks the database',
    active: 1,
    reader: "3",
    status_writer: 0,
    status_readers: 0
  },
  {
    writer: 0,
    readers: ['Reader #1', 'Reader #2', 'Reader #4', 'Writer'],
    no_of_readers : 3,
    mutex: 0,
    waiting: 1,
    chair: 'Readers #3',
    status: 'Reader #3 releases the mutex',
    active: 1,
    reader: "3",
    status_writer: 0,
    status_readers: 0
  },
  {
    writer: 0,
    readers: ['Reader #1', 'Reader #2', 'Reader #4', 'Writer'],
    no_of_readers : 3,
    mutex: 0,
    waiting: 1,
    chair: 'Reader #3',
    status: 'Reader 3 reads the data',
    active: 1,
    reader: "3",
    status_writer: 0,
    status_readers: 1
  },
  {
    writer: 0,
    readers: [ 'Reader #2','Reader #4', 'Writer'],
    no_of_readers : 2,
    mutex: 0,
    waiting: 2,
    chair: 'Readers #1, #3',
    status: 'Reader 1 arrives',
    active: 1,
    reader: "1,3",
    status_writer: 0,
    status_readers: 1
  },
  {
    writer: 0,
    readers: [ 'Reader #2',  'Reader #4', 'Writer'],
    no_of_readers : 2,
    mutex: 1,
    waiting: 2,
    chair: 'Readers #1, #3',
    status: 'Reader 1 locks the mutex and increments the readerCount',
    active: 1,
    reader: "1,3",
    status_writer: 0,
    status_readers: 1
  },
  {
    writer: 0,
    readers: [ 'Reader #2', 'Reader #4', 'Writer'],
    no_of_readers : 2,
    mutex: 0,
    waiting: 3,
    chair: 'Readers #1, #3',
    status: 'Reader 1 unlocks the mutex and reads the data',
    active: 1,
    reader: "1,3",
    status_writer: 0,
    status_readers: 1
  },
  {
    writer: 0,
    readers: ['Reader #2',  'Reader #4', 'Writer'],
    no_of_readers : 2,
    mutex: 1,
    waiting: 3,
    chair: 'Readers #1, #3',
    status: 'Reader 3 locks the mutex and decrements the readerCount',
    active: 1,
    reader: "1,3",
    status_writer: 0,
    status_readers: 1
  },
  {
    writer: 0,
    readers: ['Reader #2', 'Reader #3', 'Reader #4', 'Writer'],
    no_of_readers : 3,
    mutex: 0,
    waiting: 3,
    chair: 'Readers #1',
    status: 'Reader 3 unlocks the mutex and leaves the database',
    active: 1,
    reader: "1",
    status_writer: 0,
    status_readers: 2
  },
  {
    writer: 0,
    readers: ['Reader #3', 'Reader #4', 'Writer'],
    no_of_readers : 2,
    mutex: 1,
    waiting: 3,
    chair: 'Readers #1, #2',
    status: 'Reader 2 arrives, locks the mutex and increments the readerCount',
    active: 1,
    reader: "1,2",
    status_writer: 0,
    status_readers: 1
   },
  {
    writer: 0,
    readers: [ 'Reader #3', 'Reader #4', 'Writer'],
    no_of_readers : 2,
    mutex: 0,
    waiting: 4,
    chair: 'Readers #1, #2',
    status: 'Reader 2 unlocks the mutex and reads data from database',
    active: 1,
    reader: "1,2",
    status_writer: 0,
    status_readers: 1
  },
  {
    writer: 0,
    readers: [ 'Reader #3',  'Writer'],
    no_of_readers : 1,
    mutex: 1,
    waiting: 4,
    chair: 'Readers #1, #2 ,#4',
    status: 'Reader 4 arrives, locks the mutex and increments the readerCount',
    active: 1,
    reader: "1,2,4",
    status_writer: 0,
    status_readers: 1
  },
  {
    writer: 0,
    readers: [ 'Reader #3',  'Writer'],
    no_of_readers : 1,
    mutex: 1,
    waiting: 3,
    chair: 'Readers #1, #2 ,#4',
    status: 'Reader 1 locks the mutex and decrements the readerCount',
    active: 1,
    reader: "1,2,4",
    status_writer: 0,
    status_readers: 1
  },
  {
    writer: 0,
    readers: ['Reader #1', 'Reader #3',  'Writer'],
    no_of_readers : 2,
    mutex: 0,
    waiting: 3,
    chair: 'Readers #2, #4',
    status: 'Reader 1 unlocks the mutex and leaves the database',
    active: 1,
    reader: "2,4",
    status_writer: 0,
    status_readers: 1
  },
  {
    writer: 0,
    readers: ['Reader #1', 'Reader #3', 'Writer'],
    no_of_readers : 2,
    mutex: 0,
    waiting: 3,
    chair: 'Readers #2, #4',
    status: 'Reader 4 reads the data',
    active: 1,
    reader: "2,4",
    status_writer: 0,
    status_readers: 1
  },
  {
    writer: 0,
    readers: ['Reader #1',  'Reader #3',  'Writer'],
    no_of_readers : 2,
    mutex: 1,
    waiting: 3,
    chair: 'Readers #2, #4',
    status: 'Reader 2 locks the mutex, decrements the readerCount',
    active: 1,
    reader: "2,4",
    status_writer: 0,
    status_readers: 1
  },
  {
    writer: 0,
    readers: ['Reader #1', 'Reader #2', 'Reader #3',  'Writer'],
    no_of_readers : 3,
    mutex: 0,
    waiting: 4,
    chair: 'Reader #4',
    status: 'Reader 2 unlocks the mutex, leaves the database',
    active: 1,
    reader: "4",
    status_writer: 0,
    status_readers: 1
  },
  {
    writer: 1,
    readers: ['Reader #1', 'Reader #2', 'Reader #3'],
    no_of_readers : 3,
    mutex: 0,
    waiting: 4,
    chair: 'Reader #4',
    status: 'Writer tries to enter the database',
    active: 1,
    reader: "4",
    status_writer: 0,
    status_readers: 1
  },
  {
    writer: 1,
    readers: ['Reader #1', 'Reader #2', 'Reader #3'],
    no_of_readers : 3,
    mutex: 0,
    waiting: 5,
    chair: 'Reader #4',
    status: 'Writer sees the database locked and leaves the database',
    active: 1,
    reader: "4",
    status_writer: 0,
    status_readers: 1
  },
  {
    writer: 0,
    readers: ['Reader #1', 'Reader #2', 'Reader #3',  'Writer'],
    no_of_readers : 3,
    mutex: 1,
    waiting: 5,
    chair: 'Reader #4',
    status: 'Reader 4 locks the mutex and decrements the readerCount',
    active: 1,
    reader: "4",
    status_writer: 0,
    status_readers: 0
  },
  {
    writer: 0,
    readers: ['Reader #1', 'Reader #2', 'Reader #3',  'Writer'],
    no_of_readers : 3,
    mutex: 1,
    waiting: 5,
    chair: 'Reader #4',
    status: 'Reader 4 unlocks the database',
    active: 1,
    reader: "4",
    status_writer: 0,
    status_readers: 0
  },
  {
    writer: 0,
    readers: ['Reader #1', 'Reader #2', 'Reader #3', 'Reader #4', 'Writer'],
    no_of_readers : 4,
    mutex: 0,
    waiting: 4,
    chair: '',
    status: 'Reader 4 unlocks the mutex and leaves the database',
    active: 1,
    reader: "",
    status_writer: 0,
    status_readers: 0
  },
  {
    writer: 1,
    readers: ['Reader #1', 'Reader #2', 'Reader #3', 'Reader #4'],
    no_of_readers : 4,
    mutex: 0,
    waiting: 4,
    chair: 'Writer',
    status: 'Writer enters and locks the database',
    active: 0,
    reader: "",
    status_writer: 0,
    status_readers: 2
  },
  {
    writer: 1,
    readers: ['Reader #1', 'Reader #2', 'Reader #3', 'Reader #4'],
    no_of_readers : 4,
    mutex: 0,
    waiting: 4,
    chair: 'Writer',
    status: 'Writer writes the data',
    active: 0,
    reader: "",
    status_writer: 1,
    status_readers: 2
  },
  {
    writer: 1,
    readers: ['Reader #1','Reader #3', 'Reader #4'],
    no_of_readers : 3,
    mutex: 0,
    waiting: 4,
    chair: 'Writer',
    status: 'Reader 2 tries entering the database',
    active: 0,
    reader: "2",
    status_writer: 1,
    status_readers: 0
  },
  {
    writer: 1,
    readers: ['Reader #1', 'Reader #2','Reader #3', 'Reader #4'],
    no_of_readers : 4,
    mutex: 0,
    waiting: 3,
    chair: 'Writer',
    status: 'Reader 2 leaves the database as database is locked',
    active: 0,
    reader: "2",
    status_writer: 1,
    status_readers: 2
  },
  {
    writer: 1,
    readers: ['Reader #1', 'Reader #2','Reader #3','Reader #4', 'Writer'],
    no_of_readers : 4,
    mutex: 0,
    waiting: 3,
    chair: '',
    status: 'Writer unlocks the database and leaves the database',
    active: 0,
    reader: "",
    status_writer: 0,
    status_readers: 2
  }
  ]


  // Loads the nth step of the visualization
  var loadStep = function(n) {
    // Update state table values
    $writer.text(function() {
      if (steps[n-1]['writer'] == 0) {
        return 'Waiting';
      }
      else {
        return 'Writing';
      }
    });
    $readers.text(steps[n-1]['no_of_readers']);
    $mutex.text(function() {
      if (steps[n-1]['mutex'] == 0) {
        return 'Unlocked';
      }
      else {
        return 'Locked';
      }
    });
    $waiting.text(steps[n-1]['waiting']);
    $status.text(steps[n-1]['status']);
    $readerCount.text(4-steps[n-1]['no_of_readers']);
    $database.text(function() {
      if (steps[n-1]['chair']) {
        return steps[n-1]['chair'];
      }
      else {
        return '\xa0';
      }
    });

    // Fill the waiting room table with the readers
    // If a position is empty, put a space instead
    var readers = steps[n-1]['readers'];
    for (var i = 0; i < db_size; i++) {
        console.log(i);
      $('#chair' + (i+1)).text(function() {
        if (readers[i]) {
          return readers[i];  
        }
        else {
          return '\xa0';
        }
      });
    }

    // Toggles the writer function's semaphore label
    if (steps[n-1]['status_writer'] == 0) {
      $('#writer-status').attr('class', 'label label-warning');
      $('#writer-status').text('Waiting');
    }
    else {
      $('#writer-status').attr('class', 'label label-success');
      $('#writer-status').text('Writing');
    }

    // Shows the id of the current readers function being displayed
    if (steps[n-1]['readers']) {
      $('#readers-current').show();
      $('#readers-current').text('readers #' + steps[n-1]['readers'])
    }
    else {
      $('#readers-current').hide();
    }

    // Toggles the readers's semaphore label
    if (steps[n-1]['status_readers'] == 0) {
      $('#readers-status').attr('class', 'label label-warning');
      $('#readers-status').text('Waiting');
    }
    else if (steps[n-1]['status_readers'] == 1) {
      $('#readers-status').attr('class', 'label label-success');
      $('#readers-status').text('Reading');
    }
    else {
      $('#readers-status').attr('class', 'label label-default');
      $('#readers-status').text('None Reading');
    }

    // Toggles the active thread label
    if (steps[n-1]['active'] == 0) {
      $('#writer-active').show();
      $('#readers-active').hide();
    }
    else {
      $('#writer-active').hide();
      $('#readers-active').show();
    }


    console.log("steps length:" +steps.length);
    // Update step number in navigation buttons
    $stepn.text(step + '/' + steps.length);
  }

  // Resets visualization to the first step
  var resetVisualization = function() {
    step = 1;
    loadStep(1);
    //$('#readerCount').text(db_size);
  }



  // Event Listeners

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