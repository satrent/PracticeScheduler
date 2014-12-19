
function getTeam(teamId) {
  return 'Girls U10';
}

function getCoach(teamId) {
  return 'Matt Hanson';
}

function getField(fieldId) {
  return "C2";
}

function getWeekday(date) {
  var m = new moment(date);

  if (m.weekday() == 0) {
    return 7;
  }

  return m.weekday() - 1;
}

var eventType = {
  practice: 0,
  game: 0
}

function getWeekly(date, reoccurs, events, games) {
  var list = [];

  // add events to list
  _.each(events, function (e) {
    list.push({
      date: e.date,
      team: getTeam(e.teamId),
      coach: getCoach(e.teamId),
      weekday: new moment(e.date).weekday(),
      field: getField(e.fieldId),
      type: eventType.practice
    });
  })

  // add reoccuring practices to list
  _.each(reoccurs, function (r) {
    list.push({
      date: new moment(date).add(r.weekday, 'days').toDate(),
      team: getTeam(r.teamId),
      coach: getCoach(r.teamId),
      weekday: r.weekday,
      field: getField(r.fieldId),
      type: eventType.practice
    });
  })

  // add games to list
  _.each(games, function (g) {
    list.push({
      date: g.date,
      team: getTeam(g.teamId),
      coach: getCoach(g.teamId),
      weekday: new moment(g.date).weekday(),
      field: getField(g.fieldId),
      type: eventType.game
    });
  })

  return list;
}