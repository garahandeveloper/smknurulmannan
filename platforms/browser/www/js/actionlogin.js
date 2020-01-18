$(document).ready(function(){
	$('.modal').modal();
	ipsave();
	
	if(localStorage.getItem("ip_address") == null){
		console.log("ip kosong");
		$(".class-form-login").hide();
		$(".class-card-ip1").show();
		$(".class-card-ip2").hide();
		console.log("kosong ip");
	}else {
		console.log(localStorage.getItem("ip_address"));
		if(localStorage.getItem("nisn") != null){
			window.location.href = 'main.html';
			// alert("Anda Masih Login Sebagai"+ localStorage.getItem("nama_siswa"));
		}else if(localStorage.getItem("username") != null){
			window.location.href = 'main.html';
			// alert("Anda Masih Login Sebagai"+ localStorage.getItem("nama_guru"));
		} else {
			$(".class-view-ip-address").html(localStorage.getItem("ip_address"));
			$(".class-card-ip1").hide();
			$(".class-card-ip2").show();
			$(".class-form-login").show();
			console.log("ip ada nisn n user kosong");
			submitLogin();
			submitLoginGuru();
		}
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
			url : link + "login_siswa_api/api_login_siswa_android_sinc?act=1",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType    : "json",
			data : $(this).serialize(),
			success : function(data){
				if(data[0]["status_login"] > 0){
					M.toast({html: data[0]["message"]});
					localStorage.setItem("nama_siswa", data[0]["nama_siswa"]);
					localStorage.setItem("nisn", data[0]["nisn"]);
					localStorage.setItem("nik", data[0]["nik"]);
					localStorage.setItem("kelas_id", data[0]["kelas_id_siswa"]);
					localStorage.setItem("jurusan_id", data[0]["jurusan_id_siswa"]);
					localStorage.setItem("status_user", "1");
					window.location.href = 'main.html';
				} else {
					M.toast({html: data[0]["message"]});
				}
			}
		})
		return false;
	});
}
function submitLoginGuru(){
	var link ="http://"+localStorage.getItem("ip_address")+"/uasbnbk/";
	$('#formlogin-guru').submit(function(){
		$.ajax({
			type : "POST",
			url : link + "login_guru_api/validation?act=1",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType    : "json",
			data : $(this).serialize(),
			success : function(data){
				if(data[0]["status_login"] > 0){
					localStorage.setItem("nama_guru", data[0]["nama_guru"]);
					localStorage.setItem("username", data[0]["username"]);
					localStorage.setItem("password", data[0]["password"]);
					localStorage.setItem("status_user", "2");
					window.location.href = 'main.html';
				} else {
					M.toast({html: data[0]["message"]});
				}
			}
		})
		return false;
	});
}