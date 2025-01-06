// $("#bright").on("click", function(e){
    
//     $("body").show().addClass('bg');
//     $(".navbar2").show().addClass('bg');
//     $(".navbar").show().addClass('bg');
    // $(".new-item").show().addClass('bg');
    // $(".card").show().addClass('bg');
    
    
// })

// $("#bright").on("click", function(e){
    
//     $("body").show().removeClass('bg1');
//     $(".navbar2").show().removeClass('bg1');
//     $(".navbar").show().removeClass('bg1');
  
// })

// $("#bright").on("click", function(e){
//     if($("body").hasClass("bg1")){
//         $("body").addClass("bg")
//     }
//     else {

//         $("body").addClass("bg1")
//     }
   
    
    
// })

$(document).ready(function(){

    getCardItem();
var categoryUrl="https://dummyjson.com/products/category-list";
var productUrl="https://dummyjson.com/products/category/";
var singalproductUrl="https://dummyjson.com/products/";
// // get category list

$.ajax({
    url: categoryUrl,   //categoty url
    method: "GET",
    data:{},
    success:function(response){
        let html = "";
        var i =0;
        response.forEach(cat => {
            if(i < 5){
            
                let formattedCat = cat.replace(/-/g, ' ')
                                    .toLowerCase()
                                    .split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ');
                                    html += '<div class="card p1 column catelist" style="width: 8rem; height: 13rem;" id='+cat+'>';
                                    html += '<img src="./images/'+cat+'.svg" alt="" class="CardImage">';
                                    html += '<a href="#" class="text-decoration-none ">';
                                    html += '<h5 class="fw-bold text-dark">'+ formattedCat+'</h5>';
                                    html += '</a>';
                                    html += '</div>';
            }
            i++        
        });  
        $("#category").html(html);
    }
});

$(document).on("click", ".catelist", function () {
    var val = $(this).attr("id");
    $.ajax({
        url: productUrl+val,
        method: "GET",
        data: {},
        success:function(response){
           
            let html = "";

            response.products.forEach(product => {
                html += '   <div class="col-lg-4 " >';
                html += '       <div class="card product"  data-product-id='+product.id+'>';
                html += '            <img src="'+product.thumbnail+'" class="card-img-top" alt="...">';
                html += '           <div class="card-body">';
                html += '         <h3 class="card-title">'+product.title+'</h3>';
                html += '        <p class="card-text ">'+product.warrantyInformation+'</p>';
                html += '       <a href="#" class="Amount">'+product.price+'</a>';
                html += '       </div>';
                html += '    </div>';
                html += '  </div>';
            })
            $("#products").html(html);    
        }
    })
  });




  $(document).on("click", ".product", function (e){
    var productid =$(this).data('product-id');
   
    $.ajax({
        url: singalproductUrl+productid,     
        method: "GET",
        data: {},
        success:function(product){
            updateCart(product)
        },
        error : function(){
            console.log("Something Wrong")
        }
    })
  })
})




  function randerCart(){
    if(localStorage.getItem("cart")){
        var product = localStorage.getItem("cart");
        product = JSON.parse(product);
        var html = '';
          var i = 1;
          product.forEach(data =>{     
                html += '<tr>';
                html += '<td>'+i+'</td>';
                html += '<td> '+product.pname+'</td>';
                html += '<td>'+product.price+'</td>';
                html += '<td>'+product.Qty+'</td>';
                html += '<td> <a href="#" class = "btn" id="deleted">Delete</td>';
            html += '</tr>';
           })
          $("#card tbody").html(html)
    }
  }






  


// $("#bright").on("click", function(e){
//     $(".card-title").show().addClass('fontcolor');
//     $(".new-item,a").show().addClass('fontcolor');
//     $(".card").show().addClass('fontcolor');
// })



// $("#bright").on("click", function(e){
    
//     $("body").toggle().addClass('bg');
//     $(".navbar2").toggle().addClass('bg');
//     $(".navbar").toggle().addClass('bg');
//     $(".new-item").toggle().addClass('bg');
//     $(".card").toggle().addClass('bg');
    
    
// })




// $("#bright").on("click", function(e){
//     $(".card-title").toggle().addClass('fontcolor');
//     $(".nev").toggle().addClass('fontcolor');
//     $(".card").toggle().addClass('fontcolor');
// })

// $("#lunch").on("click", function(e){
//     $(".card-1").show();
//     $(".card").hide();
   
// })
// $("#Saland").on("click", function(e){
//     $(".card-2").show();
//     $(".card").hide();
//     $(".card-1").hide();
   
// })   


// $(document).on("click",".catelist",function(){
//     var val = $(this).attr("id");
//     $.ajax({
//         url: productUrl+val,
//         method: "GET",
//         data:{},
//         success:function(response){
//             var html = ""
//             response.products.forEach(product  =>{
//                  html += '<div class=" col lg-4 d-flex   col-sm-8 ">';
//                 html += '<div class="card column  gap-3 mb-6 " id='+product.id+'   style="width: 20rem;" >';
//                         html += '<img src='+product.thumbnail+' class="card-img-top img-fluid" alt="...">';
//                         html += '<div class="card-body">';
//                         html += '<h3 class="card-title">'+product.title+' </h3>';
//                         html += '<h5 class="card-title">'+product.discountPercentage+' </h5>';
//                         html += '<p class="card-text">'+product.price+'</p>';
                       
//                         html += '</div>';
//                         html += '</div>';
//             })
//             $("#products").html(html);
//         }
//     });
// });