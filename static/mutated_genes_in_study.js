define(function(){
    var mutated_genes_in_study= {
        mutated_genes_in_study: function(){
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

            filename = "mutated_genes_in_study_"+ cancerstudyID  

            downloadurl = "http://www.cbioportal.org/api/studies/"+cancerstudyID+"/significantly-mutated-genes?projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC"
            console.log(downloadurl);
                          
            if (confirm('Do you want to download CSV data?')) {
                $(document).ready(function() {
                var JSONData = $.getJSON(downloadurl, function(data) {
                    var items = data;            
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
    return mutated_genes_in_study;
}); //end of define