// JavaScript Document
(function(){
	
	var modelImages = document.querySelectorAll('.thumbInfo img'),
		modelInfo = document.querySelector('.modelName'),
		modelPrice = document.querySelector('.priceInfo'),
		modelDetails = document.querySelector('.modelDetails');
	
	function makeRequest() {
		
		httpRequest = new XMLHttpRequest();
		
		if (!httpRequest) {
			alert('Giving up :( Cannot create an XMLHTTP instance');
			return false;
		}
		
		httpRequest.onreadystatechange = showModelInfo;
		httpRequest.open('GET', 'includes/ajaxQuery.php' + "?model=" + this.id);
		httpRequest.send();
	}

	function showModelInfo() {
		if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
			
			modelData = JSON.parse(httpRequest.responseText);

			modelInfo.firstChild.nodeValue = modelData.modelName;
			

			
			modelDetails.firstChild.nodeValue = modelData.modelDetails;
			modelPrice.firstChild.nodeValue = "$" + modelData.pricing;
		}
	}

	[].forEach.call(modelImages, function(el) {
		el.addEventListener("click", makeRequest, false);
	});
})();