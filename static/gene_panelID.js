define(function(){
	var gene_panelID = {
		gene_panelID: function(){
			try{
		        var gene_panelID = prompt("Please enter Gene Panel ID", "NSCLC_UNITO_2016_PANEL")

		        if (gene_panelID == null || gene_panelID == "") {
		            throw new Error("User cancelled the prompt.");
		        }else {
		            gene_panelID = gene_panelID;
		        }
		    }
		    catch(e){
		        alert(e.message);
		    }

		    filename = "GenePanelID_4_"+ gene_panelID

		    downloadurl = "http://www.cbioportal.org/api/gene-panels/"+ gene_panelID;

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
	return gene_panelID;
}); //end of define