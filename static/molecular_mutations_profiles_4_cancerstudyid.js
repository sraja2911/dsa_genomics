define(function(){
    var molecular_mutations_profiles_4_cancerstudyid = {
        molecular_mutations_profiles_4_cancerstudyid: function(){
                try{
                    var molecularProfileId = prompt("Please enter molecular profilesID ", "acc_tcga_mutations")

                    if (molecularProfileId == null || molecularProfileId == "") {
                        throw new Error("User cancelled the prompt.");            
                    }else {
                        molecularProfileId = molecularProfileId;
                    }
                }
                catch(e){
                    alert(e.message);
                }

                try{
                    var cancerstudyID = prompt("Please enter Cancer Study ID for the mutations profiles", "acc_tcga_all")

                    if (cancerstudyID == null || cancerstudyID == "") {
                        throw new Error("User cancelled the prompt.");            
                    }else {
                        cancerstudyID = cancerstudyID;
                    }    
                }
                catch(e){
                    alert(e.message);
                }

                filename = "Mutations_in_MolecularProfile_4_Cancerstudy_"+ cancerstudyID +"_molecularprofiles_" + molecularProfileId

                downloadurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularProfileId+"/mutations?sampleListId="+cancerstudyID+"&projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC";
                              
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
    return molecular_mutations_profiles_4_cancerstudyid;
});