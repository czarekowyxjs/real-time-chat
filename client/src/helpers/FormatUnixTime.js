export default (seconds) => {

	const time = Math.floor(new Date().getTime()/1000)-parseInt(seconds, 10);
	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	if(time < 60) {
		return time+'s. ago';
	} else if(time < 3600) {
		return Math.floor(time/60)+'m. ago';
	} else if(time < 86400) {
		return Math.floor(time/3600)+'h. ago';
	} else if(time < 604800){
		const newTime = parseInt(seconds, 10)*1000;
		const nowDate = new Date(newTime);
		const day = nowDate.getDay();
		let hours = nowDate.getHours();
		let minutes = nowDate.getMinutes();

		if(minutes < 10) {
			minutes = '0'+minutes;
		}

		hours = hours+1;

		if(hours < 10) {
			hours = '0'+hours;
		}

		return days[day]+' '+hours+':'+minutes;
	} else {
		const newTime = parseInt(seconds, 10)*1000;
		const nowDate = new Date(newTime);
		const year = nowDate.getFullYear();
		const month = nowDate.getMonth();
		const day = nowDate.getDate();
		let hours = nowDate.getHours();
		let minutes = nowDate.getMinutes();

		if(minutes < 10) {
			minutes = '0'+minutes;
		}

		hours = hours+1;

		if(hours < 10) {
			hours = '0'+hours;
		}

		return day+' '+months[month]+' '+year+" "+hours+':'+minutes;
	}
};