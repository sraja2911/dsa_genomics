define(function(){
	var samplelist_in_study = {
		samplelist_in_study: function(){
			try{
		        var cancerStudyId = prompt("Please enter Cancer StudyId ", "gbm_tcga")

		        if (cancerStudyId == null || cancerStudyId == "") {
		            throw new Error("User cancelled the prompt.");            
		        }else {
		            cancerStudyId = cancerStudyId;
		        }
		    }
		    catch(e){
		        alert(e.message);
		    }

		    filename = "samplelist_in_study_"+ cancerStudyId

		    downloadurl = "https://www.cbioportal.org/api/studies/"+cancerStudyId+"/sample-lists?projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC";
		                  
		    if (confirm('Do you want to download CSV data?')) {
		        $(document).ready(function() {
		        var JSONData = $.getJSON(downloadurl, function(data) {
		            var items = data;
		            console.log(items);
		            const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
		            const header = Object.keys(items[0]);
		            let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
		            //let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer).replace(/\\"/g, '""')));
		            csv.unshift(header.join(','));
		            csv = csv.join('\r\n');

		            //Download the file as CSV
		            var downloadLink = document.createElement("a");
		            var blob = new Blob(["\ufeff", csv]);
		            var url = URL.createObjectURL(blob);
		            downloadLink.href = url;

		            downloadLink.download = filename + ".csv";  //Name the file here
		            document.body.appendChild(downloadLink);
		            downloadLink.click();
		            document.body.removeChild(downloadLink);
		           })
		        })
		    }
		    else {
		            promise = makePromise(downloadurl);
		            promise.then(function(result) {
		            console.log(result);        
		            return
		            }, function(err) {
		            console.log(err);
		            });    
		    }
		}//end of named/internal function
	}//end of var
	return samplelist_in_study;
}); //end of define