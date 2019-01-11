 $(document).ready(function() {
     //code materialize
     $('.sidenav').sidenav();

     let nama_perusahan;
     let b_disiplin;
     let b_kerjaT;
     let b_prilaku;
     let b_skill;
     let b_loyalitas;
     let b_masaKerja;
     let b_upah;
     let data_pegawai = [];
     //code spk
     $('#ulang').click(function() {
         document.location.reload(true);
     })
     $('.saveNP').click(function(e) {
         e.preventDefault();
         nama_perusahan = $('#namaP').val();
         if (nama_perusahan === "") {
             M.toast({ html: 'inputkan nama perusahan dengan benar!' });
         } else {
             $('.NP').hide("fast");
             $('#bobot').show("slow");
         }
     })
     // ambil nilai bobot
     $('.bb-btn').click(function() {
         b_disiplin = ($('#disiplin').val() / 100);
         b_kerjaT = ($('#Kteam').val() / 100);
         b_prilaku = ($('#prilaku').val() / 100);
         b_skill = ($('#skill').val() / 100);
         b_loyalitas = ($('#Loyal').val() / 100);
         b_masaKerja = ($('#mk').val() / 100);
         b_upah = ($('#Upah').val() / 100);
         $('#bobot').hide("fast");
         $('#datapgw').show("slow");
     })
     let arr2 = [];
     $('#tambah').click(function(e) {
         e.preventDefault();
         let form = $('#datapgw input');
         let arr = [];
         // ambil data pegawai
         form.each(function(i, elm) {
             arr[i] = elm.value;
         })
         data_pegawai.push(arr);
         form.each(function(i, elm) {
             elm.value = '';
         })
     })

     $('.hasil').click(function() {
         let hasilS = new Array();
         let total_bbt = 0;
         let bobot = [b_disiplin, b_kerjaT, b_prilaku, b_skill, b_loyalitas, b_masaKerja, b_upah];
         bobot.forEach(function(e) {
             total_bbt += e;
         })
         // normalisai bobot
         let normal_bbt = [];
         for (let i = 0; i < bobot.length; i++) {
             let hsl = bobot[i] / total_bbt;
             normal_bbt.push(hsl.toFixed(3));
         }
         // hitung nilai s
         for (let i = 0; i < data_pegawai.length; i++) {
             let htung =
                 ((Math.pow(Number(data_pegawai[i][1]), Number(bobot[0]))).toFixed(3)) *
                 ((Math.pow(Number(data_pegawai[i][2]), Number(bobot[1]))).toFixed(3)) *
                 ((Math.pow(Number(data_pegawai[i][3]), Number(bobot[2]))).toFixed(3)) *
                 ((Math.pow(Number(data_pegawai[i][4]), Number(bobot[3]))).toFixed(3)) *
                 ((Math.pow(Number(data_pegawai[i][5]), Number(bobot[4]))).toFixed(3)) *
                 ((Math.pow(Number(data_pegawai[i][6]), Number(bobot[5]))).toFixed(3)) *
                 ((Math.pow(Number(data_pegawai[i][7]), -(Number(bobot[6])))).toFixed(3));
             hasilS.push(Number(htung));
         }
         let hslS = 0;
         hasilS.forEach(function(e) {
             hslS += Number(e.toFixed(3));
             console.log("test S");
             console.log(hslS);
         });
         let hasilV = [];
         for (let i = 0; i < hasilS.length; i++) {
             let hs = hasilS[i].toFixed(3) / hslS;
             hasilV.push(hs);
         }
         // gabungkan data
         let data_lengkap = [];
         let dt = [];
         for (var i = 0; i < data_pegawai.length; i++) {
             data_lengkap.push(data_pegawai[i].concat(hasilV[i].toFixed(3)));
         }
         // isi tabel
         let data_tabel = "";
         for (let i = 0; i < data_lengkap.length; i++) {
             data_tabel += `<tr>
            <td>${data_lengkap[i][0]}</td>
            <td>${data_lengkap[i][1]}</td>
            <td>${data_lengkap[i][2]}</td>
            <td>${data_lengkap[i][3]}</td>
            <td>${data_lengkap[i][4]}</td>
            <td>${data_lengkap[i][5]}</td>
            <td>${data_lengkap[i][6]}</td>
            <td>${data_lengkap[i][7]}</td>
            <td>${data_lengkap[i][8]}</td>
          </tr>`;
         }     
         $('#isi_tabel').append(data_tabel);
         $("#datapgw").hide(1000);
    	 $("#bnk_table").show(1000);
    	 $('#idt').text(`NAMA PERUSAHAN : ${nama_perusahan}`)
     })
     // print data
     $('#print').click(function(){
     	let pt = $('#data').html();
    var mywindow = window.open('', 'Print', 'height=600,width=800');
    mywindow.document.write('<html><head><title>Print</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(pt);
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.focus()
    mywindow.print();
    mywindow.close();
     })
 });
