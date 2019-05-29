define(function(){
    var copy_number_segments = {
        copy_number_segments : function(sampleID){
                try{
                    var studyID = prompt("Please enter the Cancer StudyID", "acc_tcga")

                    if (studyID == null || studyID == "") {
                        throw new Error("User cancelled the prompt.");
                    }else {
                        studyID = studyID;
                    }
                }
                catch(e){
                    alert(e.message);
                }

                try{
                    var studysampleID = prompt("Please enter the study sample ID or leave blank for selected sampleID", "TCGA-OR-A5J2-01")
                    

                    if (studysampleID == null) {
                        throw new Error("User cancelled the prompt.");
                    }else if (studysampleID == "") {
                        studysampleID = sampleID            
                    }else{
                        studysampleID = sampleID;            
                    }
                }
                catch(e){
                    alert(e.message);
                }


                filename = patientID +"_Copy_number_Segments"

                downloadurl = "http://www.cbioportal.org/api/studies/"+studyID+"/samples/"+studysampleID+"/copy-number-segments?projection=SUMMARY&pageSize=20000&pageNumber=0&direction=ASC";

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
    return copy_number_segments;
}); //end of define