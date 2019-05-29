define(function(){
    var patient_in_study = {
        patient_in_study: function(patientID){
                try{
                    var sampleID = prompt("Please enter the study patient ID or leave blank for selected Patient ID", "TCGA-02-0001")

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

                try{
                    var cancerstudyID = prompt("Please enter Cancer StudyID ", "gbm_tcga")

                    if (cancerstudyID == null || cancerstudyID == "") {
                        throw new Error("User cancelled the prompt.");
                    }else {
                        cancerstudyID = cancerstudyID;
                    }    
                }
                catch(e){
                    alert(e.message);
                }


                filename = "patient_in_Cancerstudy_"+ sampleID

                downloadurl = "http://www.cbioportal.org/api/studies/"+ cancerstudyID+ "/patients/"+ sampleID;

                if (confirm('Do you want to download CSV data?')) {
                    $(document).ready(function() {
                    var JSONData = $.getJSON(downloadurl, function(data) {
                        var items = data;
                        console.log(items);
                        const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
                        const header = Object.keys(items[0]);
                        let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer).replace(/\\"/g, '""')));
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
    return patient_in_study;
});//end of define