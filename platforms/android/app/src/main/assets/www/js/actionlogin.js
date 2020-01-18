$(document).ready(function(){
	ipsave();
	
	if(localStorage.getItem("nisn") == "" || localStorage.getItem("nik") == null){
		if(localStorage.getItem("ip_address") == "" || localStorage.getItem("ip_address") == null){
			$(".class-form-login").hide();
			$(".class-card-ip1").show();
			$(".class-card-ip2").hide();
			console.log("kosong ip");
		} else {
			$(".class-view-ip-address").html(localStorage.getItem("ip_address"));
			$(".class-card-ip1").hide();
			$(".class-card-ip2").show();
			$(".class-form-login").show();
			console.log("ada ip");
			submitLogin();
		}
	} else {
		window.location.href = 'main.html';
	}
});
function ipsave(){
	$(".btn-save-ip").click(function(){
		var ipAddress = $("#ip").val();
		localStorage.setItem("ip_address", ipAddress);
		$(".class-card-ip1").hide();
		$(".class-card-ip2").show();
		$(".class-form-login").show();
		console.log("simpan ip");
		$(".class-view-ip-address").html(localStorage.getItem("ip_address"));	
		ipp = localStorage.getItem("ip_address");
		submitLogin();
	});
	$(".btn-reset-ip").click(function(){
		localStorage.removeItem("ip_address");
		$(".class-card-ip1").show();
		$(".class-card-ip2").hide();
		$(".class-form-login").hide();
		console.log("reset ip");
	});
}
function submitLogin(){
	var link ="http://"+localStorage.getItem("ip_address")+"/uasbnbk/";
	$('#formlogin').submit(function(){
		$.ajax({
			type : "POST",
			url : link + "login_siswa/api_login_siswa_android_sinc?act=1",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType    : "json",
			data : $(this).serialize(),
			success : function(data){
				if(data[0]["status_login"] > 0){
					M.toast({html: data[0]["message"]});
					localStorage.setItem("nama", data[0]["nama"]);
					localStorage.setItem("nisn", data[0]["nisn"]);
					localStorage.setItem("nik", data[0]["nik"]);
					localStorage.setItem("kelas_id", data[0]["kelas_id_siswa"]);
					localStorage.setItem("jurusan_id", data[0]["jurusan_id_siswa"]);
					
					window.location.href = 'main.html';
				} else {
					M.toast({html: data[0]["message"]});
				}
			}
		})
		return false;
	});
}