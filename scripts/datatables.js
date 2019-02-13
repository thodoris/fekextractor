//check if browser supports file api and filereader features
if (window.File && window.FileReader && window.FileList && window.Blob) {
	

  //this function is called when the input loads a csv file
	function renderCsv(file){
        if (!file.name.endsWith(".csv") ) {
            $( "#the-csv-file-field" ).val('');
            return;
        }
		var reader = new FileReader();
		reader.onload = function(event){
			var fileContent = event.target.result
            var array_data = $.csv.toObjects(fileContent, {separator:'\t'}, (err, data) => {
                            if (err) { console.log(err); alert('error reading csv' + err); return; }
                            var table = $('#example1').DataTable();
                            table.rows.add( data ).draw();

                          });

		} //end  reader.onload 
    
    //when the file is read it triggers the onload event above.
        
		reader.readAsText(file, 'UTF-8'); 
	}



  //watch for change on the 
	$( "#the-csv-file-field" ).change(function() {
		console.log("file has been chosen")
		//grab the first file in the fileList
		console.log(this.files[0].size)
		renderCsv(this.files[0])

	});
  


} else {

  alert('The File APIs are not fully supported in this browser.');

}
