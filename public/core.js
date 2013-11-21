var $swarm = {};

(function() {
	var serverUrl = "/subscribe";
	var workers = [];
	var workNum = 0;
	var jobNum = 0;
	var jobFile = "";

	function workerStruct(iX, data) {
		this.data = data;
		this.idx = iX;
	}

	function init(count, data) {
		var perWorker = devideWork(count, data);

		for(var iX = 0; iX < count; iX++)
			workers.push(new workerStruct(iX, perWorker[iX]));
	}

	function subscribe(jobNm, count) {
		$.ajax({
			url: serverUrl,
			type: "GET",
			data: "job=" + jobNm,
			success: function(str) {
				var data = JSON.parse(str);
				if(!data.arr) {
					jobNum = jobNm;
					jobFile = data.file;
					init(count, data.arr);
				}
			}
		});
	}

	$swarm.subscribe = subsribe;
})();