({
    onMultiSelectChange: function(cmp) {
        var selectCmp = cmp.find("InputSelectMultiple");
        var str = selectCmp.get("v.value");
        var arr = str.split(';');
        var viewData = { 
             cols:[] 
		 };
        for (var i = 0, len = arr.length; i < len; i++) {
  			viewData.cols.push({fieldName: arr[i], type: 'text'});   
        }
  	    cmp.set('v.mycolumns', viewData.cols);
        
    },
    toggleColOption : function(component, event, helper) {
        var changeColsSection = component.find("changeColsSection");
        $A.util.toggleClass(changeColsSection, "toggle");
     },
  
     myColumnAction : function(component, event, helper) {
        var changeColsSection = component.find("changeColsSection");
        $A.util.toggleClass(changeColsSection, "toggle");
      
        var toggleText = component.find("text");
        $A.util.toggleClass(toggleText, "toggle");
        
         var action = component.get("c.getContacts");
			action.setCallback(this, function(data) {
				component.set("v.contacts", data.getReturnValue());
				
                var selectCmp = component.find("InputSelectMultiple");
                var str = selectCmp.get("v.value");
                var arr = str.split(';');
                
                document.getElementById("data").innerHTML = '';
               
              	var retRecords = data.getReturnValue();
                	retRecords.forEach(function(obj) {
                        	var tableRow = document.createElement('tr');
                    		arr.forEach(function(fieldn) { 
                            	var tableData = document.createElement('td');
                            	tableData.setAttribute('data-id', obj['Id']);
                            	tableData.onclick = function() {
     							window.location = '/' + this.getAttribute('data-id');
                        	};
                         
                            var tableDataNode = document.createTextNode(obj[fieldn]);
                            tableData.appendChild(tableDataNode);
                            tableRow.appendChild(tableData);
                       });
                    
                        document.getElementById("data").appendChild(tableRow);
                  
                });
           
            });
		$A.enqueueAction(action);
	}
})