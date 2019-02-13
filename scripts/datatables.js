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
            var array_data = []
            hasErrors = false;
			var fileContent = event.target.result
            try {
            var array_data = $.csv.toObjects(fileContent, {separator:'\t'}, (err, data) => {
                            if (err) { console.log(err); hasErrors= true;  throw "Cannot read CSV!"; }
                            var table = $('#example1').DataTable();
                            table.clear()
                            table.rows.add( data ).draw();

                          });
            }
            catch {
                array_data = $.csv.toObjects(fileContent, {separator:'|'}, (err, data) => {
                            if (err) { console.log(err); hasErrors = true; return; }
                            var table = $('#example1').DataTable();
                            table.clear()
                            table.rows.add( data ).draw();

                          });
            }
            finally {
                
                if (hasErrors!=false) return;
                $('#example1').DataTable().columns([2]).every( function () {
                var column = this;
                var container = $("#predictionFilterDiv")
                container.show();
                container.html('')
                var select = $('<select><option value=""></option></select>')
                    .appendTo( container )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
 
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
 
                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );
                
            }
            
           

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
