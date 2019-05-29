define(function(){
	var molecular_data = {
		molecular_data: function(){
			try{
		        var molecularProfileId = prompt("Please enter Molecular Profile ID", "acc_tcga_rna_seq_v2_mrna")

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
		        var sampleListId = prompt("Please enter Study Sample List ID", "acc_tcga_all")

		        if (sampleListId == null || sampleListId == "") {
		            txt = "User cancelled the prompt.";
		        }else {
		            sampleListId = sampleListId;
		        }
		    }
		    catch(e){
		        alert(e.message);
		    }

		    try{
		        var geneName = prompt("Please enter valid Gene Name", "PTEN, EGFR,TP53, PDGFRA");
		        entrezGeneId = genename2geneid(geneName.toUpperCase());        
		        if (entrezGeneId == null || entrezGeneId == "") {
		            throw new Error("User cancelled the prompt.");
		        }else {
		            entrezGeneId = entrezGeneId;
		        }
		    }
		    catch(e){
		        alert(e.message);
		    }

		    filename = "MolecularProfiles_4_"+ molecularProfileId +"_"+ sampleListId +"_"+ entrezGeneId

		    downloadurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularProfileId+"/molecular-data?sampleListId="+sampleListId+"&entrezGeneId="+entrezGeneId+"&projection=SUMMARY";

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
	} //end of var
	return molecular_data;
}); //end of define