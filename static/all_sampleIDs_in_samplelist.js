define(function(){
    var all_sampleIDs_in_samplelist = {
        all_sampleIDs_in_samplelist: function(){
                try{
                    var samplelistID = prompt("Please enter the Sample listid", "gbm_tcga")
                    
                    if (samplelistID == null || samplelistID == "") {
                        throw new Error("User cancelled the prompt.");
                    }else {
                        samplelistID = samplelistID;
                    }    
                }
                catch(e){
                    alert(e.message);       
                }
                    
                console.log(samplelistID);
                filename = "all_sampleIds_" + samplelistID    

                downloadurl = "http://www.cbioportal.org/api/sample-lists/"+ samplelistID+"/sample-ids?projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC";

                if (confirm('Do you want to download CSV data?')) {
                    $(document).ready(function() {
                    var JSONData = $.getJSON(downloadurl, function(data) {
                        var items = data;
                        //const key_replacer = (key, value) => key === null ? "" : key; // specify how you want to handle null keys here
                        const replacer = (key, value) => value === null ? "" : value; // specify how you want to handle null values here
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
                        console.log(studyID);
                        promise.then(function(result) {
                        console.log(result);        
                        return
                        }, function(err) {
                        console.log(err);
                        });    
                }
        }//end of named/internal function
    }//end of var
    return all_sampleIDs_in_samplelist;
}); //end of define