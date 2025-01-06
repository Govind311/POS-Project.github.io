$(document).ready(function(){

    renderCart();
var categoryUrl="https://dummyjson.com/products/category-list";
var productUrl="https://dummyjson.com/products/category/";
var singalproductUrl="https://dummyjson.com/products/";


$.ajax({
    url: categoryUrl,   
    method: "GET",
    data:{},
    success:function(response){
        let html = "";
        var i =0;
        response.forEach(cat => {
            if(i < 5)
            {
                let formattedCat = cat.replace(/-/g, ' ')
                                    .toLowerCase()
                                    .split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ');
                                    html += '<div class="card p1 column catelist" style="width: 8rem; height: 13rem;" id='+cat+'>';
                                    html += '<img src="./images/'+cat+'.png" alt="" class="CardImage">';
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
        error:function(){
            console.log("Something Wrong")  
        }
    })
  })
})


function updateCart(product){
    const cart =loadCart();
    const productIndex = cart.findIndex(item => item.id === product.id);
    if(productIndex !== -1){
        cart[productIndex].qty++;
    } else {
        cart.push({...product, qty : 1});
    }
    saveCart(cart);
    renderCart();
}
function saveCart(cart){
    localStorage.setItem("cart",JSON.stringify(cart));
}
function loadCart(){
    return JSON.parse(localStorage.getItem("cart")) || [];
}




  function renderCart(){
    if(localStorage.getItem("cart")){
        var product = localStorage.getItem("cart");
        product = JSON.parse(product);
        var html = '';
          var i = 1;
        product.forEach(data => {
                html += '<tr>';
                html += '<td>'+i+'</td>';
                html += '<td> '+data.title+'</td>';
                html += '<td>'+data.price+'</td>';
                html += '<td>'+data.qty+'</td>';
                html += '<td> <button type="button" class="delete-btn" data-id="' + data.id + '">Delete</button></td>';
            html += '</tr>';
            i++;        
    })
    $("#card tbody").html(html)
  }
}




$(document).on("click", ".delete-btn", function () {
    var productId = $(this).data("id");
    const cart = loadCart();
    const updatedCart = cart.filter(item => item.id !== productId); 
    saveCart(updatedCart);
    renderCart(); 
});




function renderCart(){
    if(localStorage.getItem("cart")){
      var product = localStorage.getItem("cart");
      product = JSON.parse(product);
      
      var html = "";
      var i = 1;
      let TotalQty = 0;
      let TotalPrice = 0;
      // for(data in product){
        // console.log(data);
        product.forEach(data => {
            let total = data.price * data.qty
          html += `<tr>
                      <td>${i}</td>
                      <td>${data.title}</td>
                      <td>${data.price.toFixed(2)}</td>
                      <td>${data.qty}</td>
                      <td> ${total} </td>
                      <td>
                      
                         <button type="button" class="delete-btn delete" data-id="${data.id}">Delete</button>
                      </td>
                   </tr>`
  
                   i++
                  TotalQty += data.qty;
                   TotalPrice += total;
  
        })
          let totalRow = `<tr>
                          <td> = </td>
                          <td> Total Price </td>
                          <td>  </td>
                          <td> ${TotalQty}</td>
                          <td> ${TotalPrice.toFixed(2)}</td>
                          </tr>`
     
        
      // }
      $("#card tbody").html(html)
      $("#card tbody").append(totalRow)
  
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