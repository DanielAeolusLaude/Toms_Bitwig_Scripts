// generic Midi Keyboard Script with one Midi In and Out each
// Modified from the original by Thomas Helzle
// Sends Midi Beat Clock
// Maps CC 1-119 to User Controlls

loadAPI(2);
host.setShouldFailOnDeprecatedUse(true);

host.defineController("TomsScripts", "MIDI Keyboard InOut", "1.0", "f60c7450-b5bb-11e3-a5e2-0800200c9a66", "Thomas Helzle");
host.defineMidiPorts(1, 1);

var LOWEST_CC = 1;
var HIGHEST_CC = 119;

function init() {
   Generic = host.getMidiInPort(0).createNoteInput("Keys", "??????");
	Generic.setShouldConsumeEvents(false);

   host.getMidiInPort(0).setMidiCallback(onMidi);

   // Make CCs 2-119 freely mappable
   userControls = host.createUserControls(HIGHEST_CC - LOWEST_CC + 1);

   for(var i=LOWEST_CC; i<=HIGHEST_CC; i++) {
      userControls.getControl(i - LOWEST_CC).setLabel("CC" + i);
   }
}

function onMidi(status, data1, data2) {
   if (isChannelController(status)) {
      if (data1 >= LOWEST_CC && data1 <= HIGHEST_CC) {
         var index = data1 - LOWEST_CC;
         userControls.getControl(index).set(data2, 128);
      }
   }
}

function exit() {
   // Nothing to do here... ;-)
}
