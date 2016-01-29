$(document).ready(function() {
    $('#detail1').click(function() {
        $('#putcontent').html($('.boxes').eq(0).find('p').text());

    });
    $('#detail2').click(function() {
        $('#putcontent').html($('.boxes').eq(1).find('p').text());
    });
    $('#detail3').click(function() {
        $('#putcontent').html($('.boxes').eq(2).find('p').text());
    });
    $('#detail4').click(function() {
        $('#putcontent').html($('.boxes').eq(3).find('p').text());
    });

    var opic = $.ajax({
        url: 'images.json',
        type: 'GET',
        dataType: 'JSON'

    });
    opic.success(function(data) {
        var odata = data;
        for (i = 0; i < odata.Images.length; i++) {
            $('#image img').eq(i).attr("src", odata.Images[i].img);
        }

        for (i = 0; i < odata.Items.length; i++) {
            $('#item h4').eq(i).html(odata.Items[i].title);
            $('#item img').eq(i).attr("src", odata.Items[i].img);
            $('#item p').eq(i).html(odata.Items[i].desc);
        }
    });
    $('#save').on('click', function() {
        $('table').append('<tr id="myrow"><td>' + $('#sno').val() + '</td>' + '<td>' + $('#empname').val() + '</td>' + '<td>' + $('#empid').val() + '</td>' + '<td>' + $('#address').val() + '</td>' + '<td><button class="btn btn-default" id="edit" data-toggle="modal" data-target="#myModal1">Edit</button></td>' + '<td><button class="btn btn-default" id="view"  data-toggle="modal" data-target="#myModal2">View</button></td>' + '<td><button class="btn btn-default" id="delete">Delete</button></td>' + '<td><span class="glyphicon glyphicon-info-sign" id="info"></span></td>' + '</tr>');
    });
    $('#mytable').on('click', '#delete', function() {
        $(this).parent().parent().remove();
    });
    $('#create').on('click', function() {
        $('#save').show();
        $('#update').hide();
    });
    var col1, col2, col3, col4;
    $('#mytable').on('click', '#edit', function() {
        $('#mymadal1').modal('show');
        $('#save').hide();
        $('#update').show();
        var tr = $(this).closest('td').parent();
        col1 = tr.find('td').eq(0);
        col2 = tr.find('td').eq(1);
        col3 = tr.find('td').eq(2);
        col4 = tr.find('td').eq(3);
        $('#sno').val(col1.text());
        $('#empname').val(col2.text());
        $('#empid').val(col3.text());
        $('#address').val(col4.text());
    });
    $('#update').click(function() {
        col1.text($('#sno').val());
        col2.text($('#empname').val());
        col3.text($('#empid').val());
        col4.text($('#address').val());
        $('#mymodal1').modal('hide');
    });

    $('#mytable').on('click', '#view', function() {
        var a = $(this).closest('td').parent();
        $('#contentload').html('Serial No:' + a.find('td').eq(0).text() + '<br>' + 'Employee Name:' + a.find('td').eq(1).text() + '<br>' + 'Employee id:' + a.find('td').eq(2).text() + '<br>' + 'Address:' + a.find('td').eq(3).text());

    });
    $('#mytable').on("mouseover", "#info", function() {
        var tr = $(this).closest('td').parent();
        $(this).tooltip({
            title: 'Serial No:' + tr.find('td').eq(0).text() + 'EmpName:' + tr.find('td').eq(1).text() + 'EmpId:' + tr.find('td').eq(2).text() + 'Address:' + tr.find('td').eq(3).text(),
            placement: "top"
        });
    });
    var f_sl = 1;
    $('#sorting').click(function() {

        $('#sorting span').toggleClass('glyphicon-triangle-bottom glyphicon-triangle-top');
        f_sl *= -1;
        var n = $(this).prevAll().length;
        sortTable(f_sl, n);
    });

    function sortTable(f, n) {
        var rows = $('#mytable tbody  tr').get();

        rows.sort(function(a, b) {

            var A = Number($(a).children('td').eq(n).text());

            var B = Number($(b).children('td').eq(n).text());

            if (A < B) {
                return -1 * f;
            }
            if (A > B) {
                return 1 * f;
            }
            return 0;
        });

        $.each(rows, function(index, row) {
            $('#mytable').children('tbody').append(row);
        });
    }
});
