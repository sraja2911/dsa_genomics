define(function(){
    var geneexp_data = {
        geneexp_data: function(molecularprofileid,sampleid,entrezGeneId,patientID){
            molecularProfileId = molecularprofileid;
        sampleListId = sampleid;
        entrezGeneId = entrezGeneId

        downloadurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularProfileId+"/molecular-data?sampleListId="+sampleListId+"&entrezGeneId="+entrezGeneId+"&projection=SUMMARY";
        promise = makePromise(downloadurl);
        promise.then(function(result){        
            var JSONData = $.getJSON(downloadurl, function(data){
                var items = data;    
                const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
                const header = Object.keys(items[0]);
                let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer).replace(/\\"/g, '""')));
                csv.unshift(header.join(','));
                csv = csv.join('\r\n');

                lines = csv.split(/\r\n|\n/);

                var uniqueSampleKey = [];
                var uniquePatientKey = [];
                var entrezGeneId = [];
                var molecularprofileid = [];
                var sampleId = [];
                var patientId = [];
                var studyId=[];
                var geneexp = [];

                var headings = lines[0].split('');

                for (var j=1; j<lines.length; j++) {
                var values = lines[j].split(''); // Split up the comma seperated values
                   // We read the key,1st, 2nd and 3rd rows 
                   uniqueSampleKey.push(parseFloat(values[0]));
                   uniquePatientKey.push(parseFloat(values[1])); 
                   entrezGeneId.push(parseFloat(values[2]));
                   molecularprofileid.push(parseFloat(values[3]));
                   sampleId.push(parseFloat(values[0]));
                   patientId.push(parseFloat(values[1])); 
                   studyId.push(parseFloat(values[2]));
                   geneexp.push(parseFloat(values[3]));
                }

                console.log(patientID);
                console.log(patientId);
                
                if (patientId == patientID){
                    console.log(patientID);
                    console.log(patientId);
                    geneexp = geneexp;
                    console.log(geneexp);
                    return geneexp;
                }
            }) //end of JSONData
        }) //end of promise
        }//end of named/internal function
    }//end of var
    return geneexp_data;
}); //end of define