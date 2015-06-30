System.register(['secucore-sdk'], function (_export) {
  'use strict';

  var SecucardConnect, secuCardConnect;
  return {
    setters: [function (_secucoreSdk) {
      SecucardConnect = _secucoreSdk.SecucardConnect;
    }],
    execute: function () {
      secuCardConnect = new SecucardConnect();

      console.log(secuCardConnect);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1QkFHSSxlQUFlOzs7cUNBRlgsZUFBZTs7O0FBRW5CLHFCQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUU7O0FBRTNDLGFBQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUEiLCJmaWxlIjoiYXBwL21haW4uanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9