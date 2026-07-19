/** Local C360 field photos — served from /public/photos */

const p = (name) => `/photos/${name}.jpg`;

export const photos = {
  youthSmile: p('youth-smile'),
  crowdOrange: p('crowd-orange-uniform'),
  crowdJoy: p('crowd-joy'),
  laughingCyan: p('laughing-cyan'),
  schoolyardTruck: p('schoolyard-truck'),
  ubuntuGroup: p('ubuntu-group'),
  paimolSigns: p('paimol-signs'),
  raceForPeaceSign: p('race-for-peace-sign'),
  walkDirtRoad: p('walk-dirt-road'),
  walkProcession: p('walk-procession'),
  walkFeet: p('walk-feet'),
  ubuntuGirlsWalk: p('ubuntu-girls-walk'),
  c360ShirtsWalk: p('c360-shirts-walk'),
  walkPoliceEscort: p('walk-police-escort'),
  girlsCelebrateWalk: p('girls-celebrate-walk'),
  armsRaisedDrone: p('arms-raised-drone'),
  handsUpUbuntu: p('hands-up-ubuntu'),
  handsUpField: p('hands-up-field'),
  mentorField: p('mentor-field'),
  studentsC360: p('students-c360-shirts'),
  clappingLine: p('clapping-line'),
  speakerRacePeace: p('speaker-race-peace'),
  boyJerrycan: p('boy-jerrycan'),
  speakerC360Polo: p('speaker-c360-polo'),
  teamBranded: p('team-branded-seated'),
  girlsArmsRaised: p('girls-arms-raised'),
  danceBlueAxes: p('dance-blue-axes'),
  danceBlueJump: p('dance-blue-jump'),
  culturalHeaddress: p('cultural-headdress-group'),
  culturalDrums: p('cultural-drums-headdress'),
  danceHeaddressLine: p('dance-headdress-line'),
  danceCircle: p('dance-circle-feathers'),
};

/** Ordered gallery / fallback pool */
export const photoList = Object.values(photos);

export function photoAt(index) {
  return photoList[index % photoList.length];
}
