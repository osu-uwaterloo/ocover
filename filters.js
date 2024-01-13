export const filterCalendar = (comp, category) => {
	if (category === 'all') {
		return comp;
	}
	let vevents = comp.getAllSubcomponents('vevent');
	vevents.forEach(vevent => {
		if (eventType(vevent) !== category) {
			comp.removeSubcomponent(vevent);
		}
	});
	return comp;
}



const eventType = (vevent) => {
	if (vevent.getFirstPropertyValue('dtstart').isDate) {
		return 'important-date';
	}
	let summary = vevent.getFirstPropertyValue('summary');
	if (summary.includes('(LEC)')) {
		return 'lecture';
	}
	if (summary.includes('(TUT)')) {
		return 'tutorial';
	}
	if (summary.includes('(LAB)')) {
		return 'lab';
	}
	if (summary.includes('(TST)') || summary.toLowerCase().trim().endsWith('final')) {
		return 'exam';
	}
	if (vevent.getFirstPropertyValue('dtstart').toString() === vevent.getFirstPropertyValue('dtend').toString()) {
		return 'tip';
	}
	if (summary.toLowerCase().replace(/\d+$/g, '').trim().endsWith('quiz')) {
		return 'quiz';
	}
	return 'other';
}