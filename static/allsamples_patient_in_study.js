define(function(){
	var allsamples_patient_in_study = {
		allsamples_patient_in_study: function(patientId){
			try{
		        var cancerStudyId = prompt("Please enter Cancer StudyId ", "acc_tcga_mutations")

		        if (cancerStudyId == null || cancerStudyId == "") {
		            throw new Error("User cancelled the prompt.");            
		        }else {
		            cancerStudyId = cancerStudyId;
		        }
		    }
		    catch(e){
		        alert(e.message);
		    }

		    try{
		        var sampleID = prompt("Please enter the PatientID or leave blank for selected Patient ID", "TCGA-OR-A5J2-01")

		        if (sampleID == null) {
		            throw new Error("User cancelled the prompt.");
		        }else if (sampleID == "") {
		            sampleID = patientID
		        }else {
		            sampleID = sampleID;
		        }
		    }
		    catch(e){
		        alert(e.message);
		    }

		    filename = "allsamples_patient_in_study_"+ cancerStudyId +"_patientId_" + sampleID

		    downloadurl = "http://www.cbioportal.org/api/studies/"+cancerStudyId+"/patients/"+sampleID+"&projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC";
		                  
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
	return allsamples_patient_in_study;
});//end of define