//A simple Controller Script for the CopperLan VMidi virtual Midi Cables.
//- All CCs mappable
//- 16 separate Midi Channels
//- Poly Aftertouch to Timbre
//- Midi Beat Clock
//- Autodetection

loadAPI(2);
host.setShouldFailOnDeprecatedUse(true);

host.defineController("CopperLan", "VMidi 1", "1.0", "2E92F140-40BF-11E3-AA6E-0800200C9A66", "Thomas Helzle");
host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["VMidi 1"], ["VMidi 1"]);

var LOWEST_CC = 1;
var HIGHEST_CC = 119;

function init() {
   // This code is intentionally verbose to be easier to grasp and comment out ;-)
   VMidi1  = host.getMidiInPort(0).createNoteInput("Ch 1", "?0????");
   VMidi2  = host.getMidiInPort(0).createNoteInput("Ch 2", "?1????");
   VMidi3  = host.getMidiInPort(0).createNoteInput("Ch 3", "?2????");
   VMidi4  = host.getMidiInPort(0).createNoteInput("Ch 4", "?3????");
   VMidi5  = host.getMidiInPort(0).createNoteInput("Ch 5", "?4????");
   VMidi6  = host.getMidiInPort(0).createNoteInput("Ch 6", "?5????");
   VMidi7  = host.getMidiInPort(0).createNoteInput("Ch 7", "?6????");
   VMidi8  = host.getMidiInPort(0).createNoteInput("Ch 8", "?7????");
   VMidi9  = host.getMidiInPort(0).createNoteInput("Ch 9", "?8????");
   VMidi10 = host.getMidiInPort(0).createNoteInput("Ch 10", "?9????");
   VMidi11 = host.getMidiInPort(0).createNoteInput("Ch 11", "?A????");
   VMidi12 = host.getMidiInPort(0).createNoteInput("Ch 12", "?B????");
   VMidi13 = host.getMidiInPort(0).createNoteInput("Ch 13", "?C????");
   VMidi14 = host.getMidiInPort(0).createNoteInput("Ch 14", "?D????");
   VMidi15 = host.getMidiInPort(0).createNoteInput("Ch 15", "?E????");
   VMidi16 = host.getMidiInPort(0).createNoteInput("Ch 16", "?F????");

	VMidi1.setShouldConsumeEvents(false);
	VMidi2.setShouldConsumeEvents(false);
   VMidi3.setShouldConsumeEvents(false);
   VMidi4.setShouldConsumeEvents(false);
   VMidi5.setShouldConsumeEvents(false);
   VMidi6.setShouldConsumeEvents(false);
   VMidi7.setShouldConsumeEvents(false);
   VMidi8.setShouldConsumeEvents(false);
   VMidi9.setShouldConsumeEvents(false);
   VMidi10.setShouldConsumeEvents(false);
   VMidi11.setShouldConsumeEvents(false);
   VMidi12.setShouldConsumeEvents(false);
   VMidi13.setShouldConsumeEvents(false);
   VMidi14.setShouldConsumeEvents(false);
   VMidi15.setShouldConsumeEvents(false);
   VMidi16.setShouldConsumeEvents(false);

   host.getMidiInPort(0).setMidiCallback(onMidi);
	//host.getMidiInPort(0).setSysexCallback(onSysex);

   // Make CCs 2-119 freely mappable
   userControls = host.createUserControls(HIGHEST_CC - LOWEST_CC + 1);
   for(var i=LOWEST_CC; i<=HIGHEST_CC; i++) {
      userControls.getControl(i - LOWEST_CC).setLabel("CC" + i);
   }
}

function onMidi(status, data1, data2) {
	 //printMidi(status, data1, data2);
   if (isChannelController(status)) {
      if (data1 >= LOWEST_CC && data1 <= HIGHEST_CC) {
         var index = data1 - LOWEST_CC;
         userControls.getControl(index).set(data2, 128);
      }
   }
}

//function onSysex(data)
//{
//	printSysex(data);
//}

function exit() {
   // nothing to do here ... :-)
}
