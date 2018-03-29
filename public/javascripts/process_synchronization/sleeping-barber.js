$(document).ready(function() {

    var topic="Sleeping Barber";

    $('#side_top_navbar').load('../base.html', function(){
        $('.left').html(topic);
    });

  // Selectors
  var $stepn = $('#step-n');
  var $stepnext = $('#step-next');
  var $stepprev = $('#step-prev');

  var $barber = $('#barber');
  var $customers = $('#customers');
  var $mutex = $('#mutex');
  var $waiting = $('#waiting');
  var $status = $('#status');
  var $barberchair = $('#barberchair');

  // Default number of chairs
  var chairs = 5;

  // Initializes number of current step
  var step = 1;

  // JSON object for all the steps of simulation
  var steps = [
  {
    barber: 0,
    customers: [],
    mutex: 0,
    waiting: 0,
    chair: '',
    status: 'Barbershop open for business... even if the barber is sleeping.',
    active: 0,
    customer: "",
    status_barber: 0,
    status_customer: 0
  },
  {
    barber: 0,
    customers: ['Customer #1'],
    mutex: 1,
    waiting: 0,
    chair: '',
    status: 'Customer #1 arrives and locks the mutex to see if they will wait.',
    active: 1,
    customer: "1",
    status_barber: 0,
    status_customer: 2
  },
  {
    barber: 0,
    customers: ['Customer #1'],
    mutex: 0,
    waiting: 1,
    chair: '',
    status: 'Customer #1 sits down and releases the mutex.',
    active: 1,
    customer: "1",
    status_barber: 0,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #1'],
    mutex: 1,
    waiting: 1,
    chair: '',
    status: 'Barber sees a customer, locks the mutex and calls the customer.',
    active: 0,
    customer: "1",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: [],
    mutex: 0,
    waiting: 0,
    chair: 'Customer #1',
    status: 'Barber walks Customer #1 to the barber\'s chair and releases the mutex.',
    active: 0,
    customer: "1",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #2'],
    mutex: 1,
    waiting: 0,
    chair: 'Customer #1',
    status: 'Customer #2 arrives and locks the mutex to see if they will wait.',
    active: 1,
    customer: "2",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #2'],
    mutex: 0,
    waiting: 1,
    chair: 'Customer #1',
    status: 'Customer #2 sits down and releases the mutex.',
    active: 1,
    customer: "2",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3'],
    mutex: 1,
    waiting: 1,
    chair: 'Customer #1',
    status: 'Customer #3 arrives and locks the mutex to see if they will wait.',
    active: 1,
    customer: "3",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3'],
    mutex: 0,
    waiting: 2,
    chair: 'Customer #1',
    status: 'Customer #3 sits down and releases the mutex.',
    active: 1,
    customer: "3",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #4'],
    mutex: 1,
    waiting: 2,
    chair: 'Customer #1',
    status: 'Customer #4 arrives and locks the mutex to see if they will wait.',
    active: 1,
    customer: "4",
    status_barber: 1,
    status_customer: 2,
    line_barber: "7",
    line_customer: "2-3"
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #4'],
    mutex: 0,
    waiting: 3,
    chair: 'Customer #1',
    status: 'Customer #4 sits down and releases the mutex.',
    active: 1,
    customer: "4",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #4'],
    mutex: 0,
    waiting: 3,
    chair: '',
    status: 'Barber finishes cutting Customer #1\'s hair.',
    active: 0,
    customer: "4",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #4'],
    mutex: 0,
    waiting: 3,
    chair: '',
    status: 'Customer #1 leaves the barbershop.',
    active: 1,
    customer: "1",
    status_barber: 1,
    status_customer: 3
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #4', 'Customer #5'],
    mutex: 1,
    waiting: 3,
    chair: '',
    status: 'Customer #5 arrives and locks the mutex to see if they will wait.',
    active: 1,
    customer: "5",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #4', 'Customer #5'],
    mutex: 0,
    waiting: 4,
    chair: '',
    status: 'Customer #5 sits down and releases the mutex.',
    active: 1,
    customer: "5",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #4', 'Customer #5'],
    mutex: 1,
    waiting: 4,
    chair: '',
    status: 'Barber sees a customer, locks the mutex and calls the customer.',
    active: 0,
    customer: "5",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #5'],
    mutex: 0,
    waiting: 3,
    chair: 'Customer #4',
    status: 'Barber walks Customer #4 to the barber\'s chair and releases the mutex.',
    active: 0,
    customer: "5",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #5'],
    mutex: 0,
    waiting: 3,
    chair: '',
    status: 'Barber finishes cutting Customer #4\'s hair.',
    active: 0,
    customer: "5",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #5'],
    mutex: 0,
    waiting: 3,
    chair: '',
    status: 'Customer #4 leaves the barbershop.',
    active: 1,
    customer: "4",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #5', 'Customer #6'],
    mutex: 1,
    waiting: 3,
    chair: '',
    status: 'Customer #6 arrives and locks the mutex to see if they will wait.',
    active: 1,
    customer: "6",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #5', 'Customer #6'],
    mutex: 0,
    waiting: 4,
    chair: '',
    status: 'Customer #6 sits down and releases the mutex.',
    active: 1,
    customer: "6",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #5', 'Customer #6', 'Customer #7'],
    mutex: 1,
    waiting: 4,
    chair: '',
    status: 'Customer #7 arrives and locks the mutex to see if they will wait.',
    active: 1,
    customer: "7",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #5', 'Customer #6', 'Customer #7'],
    mutex: 0,
    waiting: 5,
    chair: '',
    status: 'Customer #7 sits down and releases the mutex.',
    active: 1,
    customer: "7",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #5', 'Customer #6', 'Customer #7'],
    mutex: 1,
    waiting: 5,
    chair: '',
    status: 'Customer #8 arrives and locks the mutex to see if they will wait.',
    active: 1,
    customer: "8",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #5', 'Customer #6', 'Customer #7'],
    mutex: 0,
    waiting: 5,
    chair: '',
    status: 'Customer #8 sees the full waiting room, releases the mutex and leaves.',
    active: 1,
    customer: "8",
    status_barber: 1,
    status_customer: 2,
    line_barber: "8",
    line_customer: "10-13"
  },
  {
    barber: 1,
    customers: ['Customer #2', 'Customer #3', 'Customer #5', 'Customer #6', 'Customer #7'],
    mutex: 1,
    waiting: 4,
    chair: '',
    status: 'Barber sees a customer, locks the mutex and calls the customer.',
    active: 0,
    customer: "5",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #3', 'Customer #5', 'Customer #6', 'Customer #7'],
    mutex: 0,
    waiting: 4,
    chair: 'Customer #2',
    status: 'Barber walks Customer #2 to the barber\'s chair and releases the mutex.',
    active: 0,
    customer: "2",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #3', 'Customer #5', 'Customer #6', 'Customer #7'],
    mutex: 0,
    waiting: 4,
    chair: '',
    status: 'Barber finishes cutting Customer #2\'s hair.',
    active: 0,
    customer: "2",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #3', 'Customer #5', 'Customer #6', 'Customer #7'],
    mutex: 0,
    waiting: 4,
    chair: '',
    status: 'Customer #2 leaves the barbershop.',
    active: 1,
    customer: "2",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #3', 'Customer #5', 'Customer #6', 'Customer #7'],
    mutex: 1,
    waiting: 3,
    chair: '',
    status: 'Barber sees a customer, locks the mutex and calls the customer.',
    active: 0,
    customer: "5",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #3', 'Customer #6', 'Customer #7'],
    mutex: 0,
    waiting: 3,
    chair: 'Customer #5',
    status: 'Barber walks Customer #5 to the barber\'s chair and releases the mutex.',
    active: 0,
    customer: "5",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #3', 'Customer #6', 'Customer #7'],
    mutex: 0,
    waiting: 3,
    chair: '',
    status: 'Barber finishes cutting Customer #5\'s hair.',
    active: 0,
    customer: "5",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #3', 'Customer #6', 'Customer #7'],
    mutex: 0,
    waiting: 3,
    chair: '',
    status: 'Customer #5 leaves the barbershop.',
    active: 1,
    customer: "5",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #3', 'Customer #6', 'Customer #7'],
    mutex: 1,
    waiting: 2,
    chair: '',
    status: 'Barber sees a customer, locks the mutex and calls the customer.',
    active: 0,
    customer: "3",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #6', 'Customer #7'],
    mutex: 0,
    waiting: 2,
    chair: 'Customer #3',
    status: 'Barber walks Customer #3 to the barber\'s chair and releases the mutex.',
    active: 0,
    customer: "3",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #6', 'Customer #7'],
    mutex: 0,
    waiting: 2,
    chair: '',
    status: 'Barber finishes cutting Customer #3\'s hair.',
    active: 0,
    customer: "3",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #6', 'Customer #7'],
    mutex: 0,
    waiting: 2,
    chair: '',
    status: 'Customer #3 leaves the barbershop.',
    active: 1,
    customer: "3",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #6', 'Customer #7'],
    mutex: 1,
    waiting: 1,
    chair: '',
    status: 'Barber sees a customer, locks the mutex and calls the customer.',
    active: 0,
    customer: "7",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: ['Customer #6'],
    mutex: 0,
    waiting: 1,
    chair: 'Customer #7',
    status: 'Barber walks Customer #7 to the barber\'s chair and releases the mutex.',
    active: 0,
    customer: "7",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #6'],
    mutex: 0,
    waiting: 1,
    chair: '',
    status: 'Barber finishes cutting Customer #7\'s hair.',
    active: 0,
    customer: "7",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #6'],
    mutex: 0,
    waiting: 1,
    chair: '',
    status: 'Customer #7 leaves the barbershop.',
    active: 1,
    customer: "7",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: ['Customer #6'],
    mutex: 1,
    waiting: 0,
    chair: '',
    status: 'Barber sees a customer, locks the mutex and calls the customer.',
    active: 0,
    customer: "6",
    status_barber: 1,
    status_customer: 1
  },
  {
    barber: 1,
    customers: [],
    mutex: 0,
    waiting: 0,
    chair: 'Customer #6',
    status: 'Barber walks Customer #6 to the barber\'s chair and releases the mutex.',
    active: 0,
    customer: "6",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: [],
    mutex: 0,
    waiting: 0,
    chair: '',
    status: 'Barber finishes cutting Customer #6\'s hair.',
    active: 0,
    customer: "6",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 1,
    customers: [],
    mutex: 0,
    waiting: 0,
    chair: '',
    status: 'Customer #6 leaves the barbershop.',
    active: 1,
    customer: "6",
    status_barber: 1,
    status_customer: 2
  },
  {
    barber: 0,
    customers: [],
    mutex: 0,
    waiting: 0,
    chair: '',
    status: 'Barber sees no customers and instantly falls asleep.',
    active: 0,
    customer: "",
    status_barber: 0,
    status_customer: 0
  },
  ]

  // Functions

  // Loads the nth step of the visualization
  var loadStep = function(n) {
    // Update state table values
    $barber.text(function() {
      if (steps[n-1]['barber'] == 0) {
        return 'Sleeping';
      }
      else {
        return 'Awake';
      }
    });
    $customers.text(steps[n-1]['customers'].length);
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
    $barberchair.text(function() {
      if (steps[n-1]['chair']) {
        return steps[n-1]['chair'];
      }
      else {
        return '\xa0';
      }
    });

    // Fill the db with current executing
    var customers = steps[n-1]['customers'];
    for (var i = 0; i < chairs; i++) {
      $('#chair' + (i+1)).text(function() {
        if (customers[i]) {
          return customers[i];  
        }
        else {
          return '\xa0';
        }
      });
    }
   
    // Toggles the barber function's semaphore label
    if (steps[n-1]['status_barber'] == 0) {
      $('#barber-status').attr('class', 'label label-warning');
      $('#barber-status').text('Waiting');
    }
    else {
      $('#barber-status').attr('class', 'label label-success');
      $('#barber-status').text('Running');
    }

    // Shows the id of the current customer function being displayed
    if (steps[n-1]['customer']) {
      $('#customer-current').show();
      $('#customer-current').text('Customer #' + steps[n-1]['customer'])
    }
    else {
      $('#customer-current').hide();
    }

    // Toggles the customer's semaphore label
    if (steps[n-1]['status_customer'] == 0) {
      $('#customer-status').attr('class', 'label label-default');
      $('#customer-status').text('None Running');
    }
    else if (steps[n-1]['status_customer'] == 1) {
      $('#customer-status').attr('class', 'label label-warning');
      $('#customer-status').text('Waiting');
    }
    else {
      $('#customer-status').attr('class', 'label label-success');
      $('#customer-status').text('Running');
    }

    // Toggles the active thread label
    if (steps[n-1]['active'] == 0) {
      $('#barber-active').show();
      $('#customer-active').hide();
    }
    else {
      $('#barber-active').hide();
      $('#customer-active').show();
    }

    // Update step number in navigation buttons
    $stepn.text(step + '/' + steps.length);
  }

  // Resets visualization to the first step
  var resetVisualization = function() {
    step = 1;
    loadStep(1);
    $('#chairs').text(chairs);
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