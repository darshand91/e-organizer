function checkForm(myform) { 
	// regular expression to match required date format 
	//alert("inside function");
	re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/; 
	if(myform.eventDate.value != '') { 
		if(regs = myform.eventDate.value.match(re)) { 
			// day value between 1 and 31 
			if(regs[1] < 1 || regs[1] > 31) { 
				alert("Invalid value for day: " + regs[1]); 
				myform.eventDate.focus(); 
				return false; 
			}
			// month value between 1 and 12 
			if(regs[2] < 1 || regs[2] > 12) {
				alert("Invalid value for month: " + regs[2]); 
				myform.eventDate.focus(); 
				return false; 
			}
			// year value between 1902 and 2013 
			if(regs[3] < 1902 || regs[3] > (new Date()).getFullYear()) { 
				alert("Invalid value for year: " + regs[3] + " - must be between 1902 and " + (new Date()).getFullYear()); 
				myform.eventDate.focus(); 
				return false; 
			} 
		} else { 
			alert("Invalid date format: " + myform.eventDate.value); 
			myform.eventDate.focus(); 
			return false; 
		}
	}
	else { 
		alert("Invalid date format: " + myform.eventDate.value); 
		myform.eventDate.focus(); 
		return false; 
	}
	// regular expression to match required time format
	re = /^(\d{1,2}):(\d{2})([ap]m)?$/; 
	if(myform.eventTime.value != '') { 
		if(regs = myform.eventTime.value.match(re)) { 
			if(regs[3]) { 
				// 12-hour value between 1 and 12 
				if(regs[1] < 1 || regs[1] > 12) {
					alert("Invalid value for hours: " + regs[1]); 
					myform.eventTime.focus(); 
					return false; 
				}
			}
			else { 
				// 24-hour value between 0 and 23 
				if(regs[1] > 23) { 
					alert("Invalid value for hours: " + regs[1]); 
					myform.eventTime.focus(); 
					return false; 
				}
			} 
			// minute value between 0 and 59 
			if(regs[2] > 59) { 
				alert("Invalid value for minutes: " + regs[2]); 
				myform.eventTime.focus(); 
				return false; 
			}
		} 
		else { 
			alert("Invalid time format: " + myform.eventTime.value); 
			myform.eventTime.focus(); 
			return false; 
		} 
	}
	else { 
		alert("Invalid time format: " + myform.eventTime.value); 
		myform.eventTime.focus(); 
		return false; 
	}
	alert("All input fields have been validated !"); 
	saveEvent();
	return false; 
}