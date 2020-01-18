$(document).ready(function(){
	if(window.XDomainRequest)
        contentType = "text/plain";
	var link_server = "http://localhost:8080/uasbnbk/";
	$('.fixed-action-btn').floatingActionButton({});
	$('.modal').modal();
	
	$(".class-load-number").on("click", function(){
		//$("#view-number").empty();
		var isiData = "";
		$.ajax({
			type : "POST",
			url : link_server + "Halaman_soal_siswa/api_load_number_soal?pg=1",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType    : "json",
			data : "nisn=" + localStorage.getItem("nisn") +"&nik=" + localStorage.getItem("nik") +"&token=" + localStorage.getItem("token") +"&jumlah_ujian=" +localStorage.getItem("jumlah_ujian"),
			success : function(data){
				//M.toast({html: data[0]["message"]});
				isiData += "<script>";
				isiData += "$('.class-choise').click(function(){";
					isiData += "$.ajax({";
						isiData += "type : 'POST',";
						isiData += "url : '"+link_server+"Halaman_soal_siswa/api_load_soal_siswa?pg=1',";
						isiData += "contentType: 'application/x-www-form-urlencoded; charset=utf-8',";
						isiData += "dataType    : 'json',";
						isiData += "data : 'nisn=' + localStorage.getItem('nisn') +'&nik=' + localStorage.getItem('nik') +'&token=' + localStorage.getItem('token') +'&id_bank_soal=' +$(this).attr('value'),";
						isiData += "success : function(data){";
							isiData += "$('.class-soal').html(data[0]['soal']);";
							isiData += "$('.class-a').html(data[0]['a']);";
							isiData += "$('.class-b').html(data[0]['b']);";
							isiData += "$('.class-c').html(data[0]['c']);";
							isiData += "$('.class-d').html(data[0]['d']);";
							isiData += "$('.class-e').html(data[0]['e']);";
						isiData += "}";
					isiData += "});";
				isiData += "});";
				isiData += "</script>";
				for(var i = 0; i < data.length; i++){
					var nomerSoal = i+1;
					if(data[0]['status_jawaban'] == 1){
						isiData += "<a href='#!' class='modal-close waves-effect btn-flat class-choise' style='border:1px solid #000; margin:1px;' value='"+data[i]['id_bank_soal']+"'>"+nomerSoal+"</a>";
					}else {
						isiData += "<a href='#!' class='modal-close waves-effect red lighten-3 waves-green btn-flat class-choise' style='border:1px solid #000; margin:1px;' value='"+data[i]['id_bank_soal']+"'>"+nomerSoal+" "+data[i]['jawaban']+"</a>";
					}
					
				}
				$("#view-number").html(isiData);
			}
		})
	});
	$(".class-choise").click(function(){
		alert($(this).attr("value"));
	});
	
});