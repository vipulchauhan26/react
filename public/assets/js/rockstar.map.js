//Rockstar.map 수정. Mouse Wheel event 관련 기능 삭제
(function($) {
    var target, O;

    function isWithinElement(x, y, el) {
        if (x > el.offset().left && x < el.offset().left + el.width() && y > el.offset().top && y < el.offset().top + el.height()) {
            return true
        } else {
            return false
        }
    }

function Wrapper() {
    //console.log('Wrapper');
    this.el; this.css_width; this.css_height; this.width; this.height
}
Wrapper.prototype.init = function() {
    //console.log('Wrapper init');
    this.el = target.el;
    this.css_width = (O.width == "auto") ? "100%" : O.width;
    this.css_height = (O.height == "auto") ? "100%" : O.height;
    this.css();
    this.width = this.el.width();
    this.height = this.el.height();
    //.log('$("#network-map")//wrapper//width : '+this.width);
};
Wrapper.prototype.css = function() {
    //console.log('Wrapper css');
    var base = this;
    base.el.css({
        width: base.css_width,
        height: base.css_height,
        overflow: "hidden",
        position: "relative"
    })
};
    Wrapper.prototype.refresh = function() {
        //console.log('Wrapper refresh');
        this.width = this.el.width();
        this.height = this.el.height();
        target.container.mox = (O.image.width * target.container.z - this.width) * (-1);
        target.container.moy = (O.image.height * target.container.z - this.height) * (-1);
        if (typeof window.innerWidth != "undefined") {
            target.fullscreen.viewportWidth = window.innerWidth;
            target.fullscreen.viewportHeight = window.innerHeight
        }
    };
    // 161122 Add
    Wrapper.prototype.destroy = function() {
        //console.log('Wrapper destroyInit');
        var moData ='';
        moData += '<div id="network-map02">';
        moData += this.el.find('.ncl-container').html();
        moData += '</div>';
        $('.network.global').append(moData);
        this.el.parent().find('#network-map02 [class^="ncl-"]').removeAttr('style');
        this.el.parent().find('#network-map02 .ncl-map-image').empty().remove();

        ////console.log('html'+this.el.find('.ncl-container').html());
        // target.wrapper.destroy();
    };

    function Container() {
        //console.log('Container');
        this.el;
        this.ox;
        this.oy;
        this.oox;
        this.ooy;
        this.mox;
        this.moy;
        this.z;
        this.mz;
        this.w;
        this.h;
        this.cw;
        this.ch
    }
    Container.prototype.init = function() {
        //console.log('Container init');
        this.ox = 0;
        this.oy = 0;
        this.oox = 0;
        this.ooy = 0;
        this.mox = (O.image.width - target.wrapper.width) * (-1);
        this.moy = (O.image.height - target.wrapper.height) * (-1);
        //console.log(O.image.height+'//'+target.wrapper.height);
        this.z = O.zoom.initial;
        this.mz = O.zoom.max;
        this.w = O.image.width;
        this.h = O.image.height;
        this.cw = this.w;
        this.ch = this.h;
        target.wrapper.el.wrapInner('<div class="ncl-container" />');
        target.wrapper.el.find(".ncl-container").wrapInner('<div class="ncl-img-wrap"/>');
        this.el = target.wrapper.el.find(".ncl-container");
        target.container.css();
        target.container.center();
        target.container.get_focal_point();
        target.container.zoom_zoom_init()
    };
    Container.prototype.css = function() {
        //console.log('Container css');
        this.el.css({
            width: O.image.width,
            height: O.image.height
        })
    }, Container.prototype.drag_init = function(e) {
        //console.log('Container drag_init');
        this.el.stop();
        this.refresh();
        this.sx = e.pageX;
        this.sy = e.pageY;
        this.iox = this.ox;
        this.ioy = this.oy;
        this.left = target.container.ox;
        this.top = target.container.oy;
        this.deltax = 0;
        this.deltay = 0;
        this.inertiaDuration = 2000
    }, Container.prototype.drag_drag = function(e) {
        this.ox = this.iox + e.pageX - this.sx;
        this.oy = this.ioy + e.pageY - this.sy;
        this.deltax = this.ox - this.left;
        this.deltay = this.oy - this.top;
        if (!target.fullscreen.is_fullscreen) {
            this.left = (this.ox < target.container.mox) ? target.container.mox : (this.ox > 0) ? 0 : this.ox;
            this.top = (this.oy < target.container.moy) ? target.container.moy : (this.oy > 0) ? 0 : this.oy
        } else {
            this.left = this.ox;
            this.top = this.oy
        }
        target.container.el.css({
            left: this.left,
            top: this.top,
        })
    }, Container.prototype.drag_finish = function(e) {
        this.ox = this.el.position().left;
        this.oy = this.el.position().top;
        if (O.animations.inertia) {
            this.apply_inertia(this.get_focal_point, this.deltax, this.deltay)
        } else {
            this.get_focal_point()
        }
    };
    Container.prototype.zoom_zoom_init = function() {
        this.cw = this.w;
        this.ch = this.h
    }, Container.prototype.zoom_zoom_at = function(factor) {
        this.cw = this.w * factor;
        this.ch = this.h * factor;
        this.z = factor;
        this.el.css({
            width: this.cw,
            height: this.ch
        });
        this.zoom_refresh();
        target.locations.refresh()
    };
    Container.prototype.zoom_zoom_in = function() {
        var factor = (target.container.z + 1 > O.zoom.max) ? O.zoom.max : this.z + 1;
        this.cw = this.w * factor;
        this.ch = this.h * factor;
        this.z = factor;
        this.z = this.z;
        this.cw = this.cw;
        this.ch = this.ch;
        this.mox = (this.cw - target.wrapper.width) * (-1);
        this.moy = (this.ch - target.wrapper.height) * (-1);
        var l = -(this.focal_point.x - target.wrapper.width / 2) - this.focal_point.x * (this.z - 1);
        var t = -(this.focal_point.y - target.wrapper.height / 2) - this.focal_point.y * (this.z - 1);
        if (!target.fullscreen.is_fullscreen) {
            var left = (l < this.mox) ? this.mox : (l > 0) ? 0 : l;
            var top = (t < this.moy) ? this.moy : (t > 0) ? 0 : t
        } else {
            var left = l;
            var top = t
        }
        this.el.css({
            width: this.cw,
            height: this.ch,
            left: left,
            top: top
        });
        target.locations.refresh();
        target.navigation.update()
    };
    Container.prototype.zoom_zoom_out = function() {
        var factor = (target.container.z - 1 < 1) ? 1 : target.container.z - 1;
        this.cw = this.w * factor;
        this.ch = this.h * factor;
        this.z = factor;
        target.container.z = this.z;
        target.container.cw = this.cw;
        target.container.ch = this.ch;
        target.container.mox = (this.cw - target.wrapper.width) * (-1);
        target.container.moy = (this.ch - target.wrapper.height) * (-1);
        var l = -(target.container.focal_point.x - target.wrapper.width / 2) - target.container.focal_point.x * (this.z - 1);
        var t = -(target.container.focal_point.y - target.wrapper.height / 2) - target.container.focal_point.y * (this.z - 1);
        if (!target.fullscreen.is_fullscreen) {
            var left = (l < target.container.mox) ? target.container.mox : (l > 0) ? 0 : l;
            var top = (t < target.container.moy) ? target.container.moy : (t > 0) ? 0 : t
        } else {
            var left = l;
            var top = t
        }
        this.el.css({
            width: this.cw,
            height: this.ch,
            left: left,
            top: top
        });
        target.locations.refresh();
        target.navigation.update()
    }, Container.prototype.zoom_refresh = function() {
        this.z = this.z;
        this.cw = this.cw;
        this.ch = this.ch;
        if (!target.fullscreen.is_fullscreen) {
            this.mox = (this.cw - target.wrapper.width) * (-1);
            this.moy = (this.ch - target.wrapper.height) * (-1)
        }
        var l = -(this.focal_point.x - target.wrapper.width / 2) - this.focal_point.x * (this.z - 1);
        var t = -(this.focal_point.y - target.wrapper.height / 2) - this.focal_point.y * (this.z - 1);
        if (!target.fullscreen.is_fullscreen) {
            var left = (l < this.mox) ? this.mox : (l > 0) ? 0 : l;
            var top = (t < this.moy) ? this.moy : (t > 0) ? 0 : t
        } else {
            var left = l;
            var top = t
        }
        this.el.css({
            left: left,
            top: top
        })
    };
    Container.prototype.move = function(direction) {
        if (direction == "left") {
            this.go_at(this.focal_point.x * this.z - this.w / 7, this.focal_point.y * this.z)
        }
        if (direction == "right") {
            this.go_at(this.focal_point.x * this.z + this.w / 7, this.focal_point.y * this.z)
        }
        if (direction == "up") {
            this.go_at(this.focal_point.x * this.z, this.focal_point.y * this.z - this.h / 7)
        }
        if (direction == "down") {
            this.go_at(this.focal_point.x * this.z, this.focal_point.y * this.z + this.w / 7)
        }
    };
    Container.prototype.apply_inertia = function(cb, dx, dy) {
        //console.log('Container apply ineria');
        if (O.animations.inertia) {
            //console.log('ineria 1');
            var m = 5,
                ox, oy;
            this.interval;
            var root = this;
            if (this.interval != 1) {
                clearInterval(this.interval)
            }
            var nx, ny;
            var fs = target.fullscreen.is_fullscreen;
            this.interval = setInterval(function() {
                if (!fs) {
                    //console.log('ineria 2');
                    ox = (root.ox + (dx / 10) * m < root.mox) ? root.mox : (root.ox + (dx / 10) * m > 0) ? 0 : root.ox + (dx / 10) * m;
                    oy = (root.oy + (dy / 10) * m < root.moy) ? root.moy : (root.oy + (dy / 10) * m > 0) ? 0 : root.oy + (dy / 10) * m
                } else {
                    //console.log('ineria 3');
                    ox = root.ox + (dx / 10) * m;
                    oy = root.oy + (dy / 10) * m
                }
                root.el.css({
                    left: ox,
                    top: oy
                });
                if (ox - root.ox == 0 && oy - root.oy == 0) {
                    clearInterval(root.interval);
                    root.interval = 1
                }
                root.refresh();
                m = m / 1.04;
                if (m <= 0.005) {
                    clearInterval(root.interval);
                    root.interval = 1
                }
            }, 10)
        } else {
            cb()
        }
    }, Container.prototype.constrain = function() {
        //console.log('Container constrain');
        this.ox = this.el.position().left;
        this.oy = this.el.position().top;
        this.left = (this.ox < this.mox) ? this.mox : (this.ox > 0) ? 0 : this.ox;
        this.top = (this.oy < this.moy) ? this.moy : (this.oy > 0) ? 0 : this.oy;
        this.el.css({
            left: this.left,
            top: this.top,
        })
    }, Container.prototype.center = function() {
        //console.log('Container center');
        this.left = (target.wrapper.width - O.image.width) / 2;
        this.top = (target.wrapper.height - O.image.height) / 2;
        this.ox = this.left;
        this.oy = this.top;
        ////console.log('this.left'+this.left+'this.top'+this.top+'this.ox'+this.ox+'this.oy'+this.oy);
        this.el.css({
            left: this.left,
            top: this.top
        })
    }, Container.prototype.go_at = function(x, y, no_animation) {
        //console.log('Container go_at');
        //console.log('x'+x+'y'+y);
        var base = this;
        var winW = $(window).width() || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (O.animations.inertia && this.interval != 1) {
            clearInterval(this.interval)
        }
        this.ox = (x - target.wrapper.width / 2) * (-1);
        this.oy = (y - target.wrapper.height / 2) * (-1);
        if (!target.fullscreen.is_fullscreen) {
            //console.log(this.moy+'/'+this.oy);
            // this.left = (this.ox < this.mox) ? this.mox : (this.ox > 0) ? 0 : this.ox;
            // this.top = (this.oy < this.moy) ? this.moy : (this.oy > 0) ? 0 : this.oy
            this.left = this.ox - 100;
            this.top = this.oy - 263;
        } else {
            this.left = this.ox;
            this.top = this.oy
        }
        if (O.animations.move && !no_animation) {
            //console.log('1:'+winW);
            var tempLeft;
            if(winW <= 1024){
                tempLeft = base.left - 400;
            }else{
                tempLeft = base.left - 100;
            }
            base.el.stop().animate({
                left: tempLeft,
                top: base.top
            }, {
                duration: 700,
                easing: "easeOutCubic",
                step: function() {
                    base.refresh()
                },
                complete: function() {
                    base.refresh()
                }
            })
        } else {
            //console.log('2');
            base.el.css({
                left: base.left,
                top: base.top
            });
            base.refresh()
        }
    }, Container.prototype.refresh = function() {
        //console.log('Container refresh');
        this.ox = this.el.position().left;
        this.oy = this.el.position().top;
        this.get_focal_point()
    }, Container.prototype.get_focal_point = function() {
        this.focal_point = {
            x: (target.wrapper.width / 2 - this.ox) / this.z,
            y: (target.wrapper.height / 2 - this.oy) / this.z
        }
    };

    function Locations() {
        //console.log('Location');
        this.ar;
        this.locs
    }
    Locations.prototype.init = function() {
        //console.log('Location init');
        this.ar = new Array();
        var dom_elements = target.wrapper.el.find(".location");
        var l = dom_elements.length;
        for (var i = 0; i < l; i++) {
            _x = Math.floor(($('.ncl-img-wrap').width() * 0.01) * $(dom_elements[i]).attr("data-x"));
            _y = Math.floor(($('.ncl-img-wrap').height() * 0.01) * $(dom_elements[i]).attr("data-y"));
            this.ar[i] = {
                id: $(dom_elements[i]).attr("id"),
                x: _x,
                y: _y,
                title: $(dom_elements[i]).attr("data-title"),
                main_heading: $(dom_elements[i]).find("h3").html(),
                sub_heading: $(dom_elements[i]).find("h4").html(),
                address: $(dom_elements[i]).find(".address").html(),
                phone: $(dom_elements[i]).find(".phone").text(),
                website: $(dom_elements[i]).find(".website").html(),
                mail: $(dom_elements[i]).find(".mail").text(),
                content: $(dom_elements[i]).find(".content").html(),
                link_title : $(dom_elements[i]).find("h4").text()
            }
        }
        dom_elements.empty().remove();
        target.locations.html();
        target.locations.css();
    };
    Locations.prototype.html = function() {
        //console.log('Location html');
        var html;
        this.locs = new Array();
        var l = this.ar.length;
        for (var i = 0; i < l; i++) {
           console.log('location html i'+i);
            html = '<div class="ncl-location" id=' + this.ar[i].id + ' style="left: ' + this.ar[i].x + "px; top: " + this.ar[i].y + 'px;" >\n';
            html += '\t<a href="#" class="ncl-location-pin" title="'+this.ar[i].link_title+'" data-id="' + i + '"></a>\n';
            html += '\t<div class="ncl-location-contents">\n';
            html += '\t\t<a href="#" class="ncl-location-close"></a>\n';
            if (this.ar[i].main_heading != null && this.ar[i].main_heading != undefined) {
                html += "\t\t<h3>" + this.ar[i].main_heading + "</h3>\n"
            }
            if (this.ar[i].sub_heading != null && this.ar[i].sub_heading != undefined) {
                html += "\t\t<h4>" + this.ar[i].sub_heading + "</h4>\n"
            }
            if (this.ar[i].address != null && this.ar[i].address != undefined) {
                html += '\t\t<p class="address">' + this.ar[i].address + "</p>\n"
            }
            if (this.ar[i].phone != null && this.ar[i].phone != undefined) {
                var strArray = this.ar[i].phone.replace( /phone/gi, "").split(" / ");
                if (this.ar[i].mail != null && this.ar[i].mail != undefined) {
                    var strArray2 = this.ar[i].mail.replace( /이메일/gi, "").split(" / ");
                }
                for(var j=0; j < strArray.length; j++){
                    ////console.log(i+'i/'+j+' str_text : '+strArray[j]);
                    if(strArray[j] != ''){
                        html += '\t\t<p class="phone">' + strArray[j] + "</p>\n";
                    }
                    if(strArray2[j] != '' && strArray2[j] != undefined ){
                        html += '\t\t<p class="mail">' + strArray2[j] + "</p>\n";
                    }
                }
            }
            if (this.ar[i].website != null && this.ar[i].website != undefined) {
                var websiteLink = this.ar[i].website.replace('<span class="blind">website</span>','');
                //console.log('websiteLink'+websiteLink);
                html += '\t\t<p class="website"><a href="' + websiteLink + '" target="_blank" title="">' + websiteLink + "</a></p>\n";
            }
            html += "\t</div>\n";
            html += "</div>\n";
            target.container.el.find('.ncl-img-wrap').append(html);

            this.locs[i] = $(".ncl-location#" + this.ar[i].id)
        }
    };
    Locations.prototype.css = function() {
        //console.log('Location css');
        var l = this.locs.length;
        for (var i = 0; i < l; i++) {
            this.locs[i].find(".ncl-location-contents").data({
                height: this.locs[i].find(".ncl-location-contents").outerHeight()
            });
            this.locs[i].find(".ncl-location-contents").css({
                top: -$(this.locs[i]).find(".ncl-location-contents").data("height") - 15
            }).hide()
        }
    };
    Locations.prototype.focus = function(index) {
        //console.log('Location focus');
        $(".ncl-location-contents.ncl-active").removeClass("ncl-active").stop().fadeOut(250);
        this.locs[index].find(".ncl-location-contents").addClass("ncl-active").stop().fadeIn(250);
        $(".ncl-selected-location").removeClass("ncl-selected-location");
        this.locs[index].addClass("ncl-selected-location");
        var d = (this.locs[index].find(".ncl-location-contents").data("height")) / 2;
        target.container.go_at((target.locations.ar[index].x) * target.container.z, (target.locations.ar[index].y) * target.container.z - d)
    };
    Locations.prototype.contract = function(index) {};
    Locations.prototype.refresh = function(no_anim) {
        //console.log('Location refresh');
        var z = target.container.z;
        var l = this.ar.length;
        for (var i = 0; i < l; i++) {
            $(".ncl-location#" + this.ar[i].id).css({
                left: this.ar[i].x * target.container.z,
                top: this.ar[i].y * target.container.z,
            })
        }
    };

    function Menu() {
        this.el;
        this.ul
    }
    Menu.prototype.init = function() {
        target.wrapper.el.append('<div class="ncl-menu-wrap" />');
        this.el = target.wrapper.el.find(".ncl-menu-wrap");
        this.el.append("<ul />");
        this.ul = this.el.find("ul");
        var l = target.locations.ar.length;
        for (var i = 0; i < l; i++) {
            this.ul.append('<li id="ncl-location-' + i + '">' + target.locations.ar[i].title + "</li>")
        }
    };

    function Map() {
        this.img;
        this.el
    }
    Map.prototype.init = function() {
        this.img = new Image();
        this.img.src = O.image.src;
        $(this.img).addClass("ncl-map-image");
        target.container.el.append($(this.img));
        this.el = $(this.img)
    };

    function Navigation() {
        this.el;
        this.sliderPos;
        this.sliderDraggable;
        this.sliderHeight;
        this.sy;
        this.moy
    }
    Navigation.prototype.init = function() {
        this.el;
        this.sliderPos = 100;
        this.html();
        this.css()
    }, Navigation.prototype.html = function() {
        target.wrapper.el.append('<div class="ncl-nav-wrap" />');
        this.el = target.wrapper.el.find(".ncl-nav-wrap");
        var html;
        if (O.nav_ui.move_ui) {
            html = '<div class="ncl-nav-move">';
            html += '<div class="ncl-move-left"></div>';
            html += '<div class="ncl-move-right"></div>';
            html += '<div class="ncl-move-up"></div>';
            html += '<div class="ncl-move-down"></div>';
            html += "</div>"
        }
        if (O.nav_ui.zoom_ui) {
            html += '<div class="ncl-slider-wrap">';
            html += '<div class="ncl-slider">';
            html += '<div class="ncl-slider-draggable"></div>';
            html += '<div class="ncl-slider-slidebar"></div>';
            html += "</div>";
            html += '<div class="ncl-slider-zoomin"></div>';
            html += '<div class="ncl-slider-zoomout"></div>';
            html += "</div>"
        }
        this.el.append(html);
        this.sliderDraggable = this.el.find(".ncl-slider-draggable");
        this.sliderHeight = this.el.find(".ncl-slider").height();
        if (!O.nav_ui.move_ui && O.nav_ui.zoom_ui) {
            target.wrapper.el.find(".ncl-slider-wrap").addClass("ncl-single")
        }
    }, Navigation.prototype.css = function() {};
    Navigation.prototype.update = function() {
        this.sliderPos = -(target.container.z - O.zoom.max) / (O.zoom.max - 1) * 100;
        this.sliderDraggable.css({
            top: this.sliderPos + "%"
        })
    };
    Navigation.prototype.drag_init = function(e) {
        this.sy = e.pageY;
        this.moy = 100;
        this.sliderPos = (e.pageY - this.el.find(".ncl-slider").offset().top) / this.sliderHeight * 100;
        target.navigation.sliderDraggable.css({
            top: this.sliderPos + "%"
        })
    };
    Navigation.prototype.drag_drag = function(e) {
        this.oy = this.sliderPos + ((e.pageY - this.sy) / this.sliderHeight * 100);
        this.oy = (this.oy > 100) ? 100 : (this.oy < 0) ? 0 : this.oy;
        this.sliderDraggable.css({
            top: this.oy + "%"
        });
        target.container.zoom_zoom_at((1 - (this.oy / 100)) * (O.zoom.max - 1) + 1)
    };
    Navigation.prototype.drag_finish = function(e) {
        target.navigation.sliderPos = this.oy
    };
    Navigation.prototype.touch_init = function(e) {
        target.container.el.stop();
        this.sd = Math.sqrt(Math.pow(e.touches[0].pageX - e.touches[1].pageX, 2) + Math.pow(e.touches[0].pageY - e.touches[1].pageY, 2));
        this.startPos = this.sliderPos
    };
    Navigation.prototype.touch_drag = function(e) {
        this.d = Math.sqrt(Math.pow(e.touches[0].pageX - e.touches[1].pageX, 2) + Math.pow(e.touches[0].pageY - e.touches[1].pageY, 2));
        this.delta = this.d - this.sd;
        this.sliderPos = this.startPos - ((this.delta / 6) / this.sliderHeight * 100);
        this.sliderPos = (this.sliderPos < 0) ? 0 : (this.sliderPos > 100) ? 100 : this.sliderPos;
        this.sliderDraggable.css({
            top: this.sliderPos + "%"
        });
        target.container.zoom_zoom_at((1 - (this.sliderPos / 100)) * (O.zoom.max - 1) + 1)
    };
    Navigation.prototype.touch_finish = function(e) {
        this.sd = 0;
        this.d = 0;
        this.delta = 0;
        target.navigation.sliderPos = this.sliderPos
    };

    function Fullscreen() {
        this.button;
        this.is_fullscreen;
        this.viewportWidth;
        this.viewportHeight;
        this.button
    }
    Fullscreen.prototype.init = function() {
        this.html();
        this.button = target.wrapper.el.find(".ncl-fullscreen");
        this.is_fullscreen = false;
        if (typeof window.innerWidth != "undefined") {
            this.viewportWidth = window.innerWidth;
            this.viewportHeight = window.innerHeight
        }
    };
    Fullscreen.prototype.html = function() {
        target.wrapper.el.append('<div class="ncl-fullscreen" />')
    };
    Fullscreen.prototype.enter = function() {
        this.button.css({
            right: 30
        });
        this.is_fullscreen = true;
        target.wrapper.el.wrap('<div class="ncl-fullscreen-wrap" />');
        target.wrapper.el.parent().css({
            width: this.viewportWidth,
            height: this.viewportHeight
        });
        if (O.width != "auto") {
            target.wrapper.el.css({
                width: "100%"
            })
        }
        if (O.height != "auto") {
            target.wrapper.el.css({
                height: "100%"
            })
        }
        target.wrapper.refresh();
        target.container.go_at(target.container.focal_point.x * target.container.z, target.container.focal_point.y * target.container.z, true)
    };
    Fullscreen.prototype.refresh = function() {
        if (typeof window.innerWidth != "undefined") {
            this.viewportWidth = window.innerWidth;
            this.viewportHeight = window.innerHeight
        }
        target.wrapper.el.parent().css({
            width: this.viewportWidth,
            height: this.viewportHeight
        })
    };
    Fullscreen.prototype.exit = function() {
        this.button.css({
            right: 15
        });
        this.is_fullscreen = false;
        target.wrapper.el.unwrap();
        if (O.width != "auto") {
            target.wrapper.el.css({
                width: target.wrapper.css_width
            })
        }
        if (O.height != "auto") {
            target.wrapper.el.css({
                height: target.wrapper.css_height
            })
        }
        target.wrapper.refresh();
        target.container.go_at(target.container.focal_point.x * target.container.z, target.container.focal_point.y * target.container.z, true)
    };

    function Autohide() {
        this.ui
    }
    Autohide.prototype.init = function() {
        var base = this;
        var visible = false;
        base.ui = $(".ncl-nav-move").add(".ncl-slider-wrap").add(".ncl-fullscreen").add(".ncl-menu-wrap");
        base.ui.fadeOut();
        target.wrapper.el.on("mouseover", function(e) {
            if (isWithinElement(e.pageX, e.pageY, target.wrapper.el)) {
                base.ui.fadeIn()
            }
        });
        target.wrapper.el.on("mouseout", function(e) {
            if (!isWithinElement(e.pageX, e.pageY, target.wrapper.el)) {
                base.ui.fadeOut()
            }
        })
    };

    function Mouse() {
        this.mouseDown;
        this.dragging;
        this.sliderDragging;
        this.sliderMouseDown
    }
    Mouse.prototype.init = function() {
        var base = this;
        base.mouseDown = false;
        base.dragging = false;
        base.sliderDragging = false;
        base.sliderMouseDown = false;
        target.wrapper.el.on("mousedown", function(e) {
            e.preventDefault();
            if (O.animations.inertia && target.container.interval != 1) {
                clearInterval(target.container.interval)
            }
            if ($(e.target).closest(".ncl-slider").length != 0) {
                base.sliderMouseDown = true
            } else {
                base.mouseDown = true
            }
            return false
        });
        $(document).on("mousemove", function(e) {
            e.preventDefault();
            if (base.mouseDown && !base.dragging) {
                base.dragging = true;
                target.container.drag_init(e)
            }
            if (base.dragging) {
                target.container.drag_drag(e)
            }
            if (base.sliderMouseDown && !base.sliderDragging) {
                base.sliderDragging = true;
                target.navigation.drag_init(e)
            }
            if (base.sliderDragging) {
                target.navigation.drag_drag(e)
            }
            return false
        });
        $(document).on("mouseup", function(e) {
            if (base.mouseDown) {
                base.mouseDown = false
            }
            if (base.dragging) {
                base.dragging = false;
                target.container.drag_finish(e)
            }
            if (base.sliderMouseDown) {
                base.sliderMouseDown = false
            }
            if (base.sliderDragging) {
                base.sliderDragging = false;
                target.navigation.drag_finish(e)
            }
        });
        target.wrapper.el.on("click", function(e) {
            if ($(e.target).hasClass("ncl-fullscreen")) {
                if (target.fullscreen.is_fullscreen) {
                    target.fullscreen.exit()
                } else {
                    target.fullscreen.enter()
                }
            } else {
                e.preventDefault();
                if ($(e.target).closest(".ncl-menu-wrap").length != 0) {
                    var index = $(e.target).attr("id").replace("ncl-location-", "");
                    target.locations.focus(index);
                } else {
                    if ($(e.target).hasClass("ncl-location-pin")) {
                        var index = $(e.target).attr("data-id");
                        target.locations.focus(index)
                    } else {
                        if ($(e.target).hasClass("ncl-slider-zoomin")) {
                            target.container.zoom_zoom_in()
                        } else {
                            if ($(e.target).hasClass("ncl-slider-zoomout")) {
                                target.container.zoom_zoom_out()
                            } else {
                                if ($(e.target).parent().hasClass("ncl-nav-move")) {
                                    var direction = $(e.target).attr("class").replace("ncl-move-", "");
                                    target.container.move(direction)
                                } else {
                                    if ($(e.target).hasClass("ncl-location-close")) {
                                        $(".ncl-location-contents.ncl-active").removeClass("ncl-active").stop().fadeOut(250)
                                    }
                                }
                            }
                        }
                    }
                }

                if ( $('.ncl-location-contents p.website').length > 0 ) {
                    $('.ncl-location-contents p.website a').on("click", function(e){
                        var link = $(this).attr('href');
                        window.open(link,'scrollbars=yes,toolbar=yes,location=yes,resizable=yes,status=yes,menubar=yes,resizable=yes,width=100,height=100,left=0,top=0,fullscreen');
                    });
                }
            }
        })
    };

    function Touch() {
        this.fingerDown;
        this.dragging;
        this.sliderFingerDown;
        this.sliderDragging;
        this.twoFingersDown;
        this.twoFingersDragging
    }
    Touch.prototype.init = function() {
        var base = this;
        base.fingerDown = false;
        base.dragging = false;
        base.sliderFingerDown = false;
        base.sliderDragging = false;
        base.twoFingersDown = false;
        base.twoFingersDragging = false;
        target.wrapper.el.get(0).addEventListener("touchstart", function(e) {
            e.preventDefault();
            if (O.animations.inertia && target.container.interval != 1) {
                clearInterval(target.container.interval)
            }
            if (e.touches.length > 1) {
                base.twoFingersDown = true
            } else {
                if ($(e.target).hasClass("ncl-fullscreen")) {
                    if (target.fullscreen.is_fullscreen) {
                        target.fullscreen.exit()
                    } else {
                        target.fullscreen.enter()
                    }
                } else {
                    if ($(e.target).closest(".ncl-menu-wrap").length != 0) {
                        var index = $(e.target).attr("id").replace("ncl-location-", "");
                        target.locations.focus(index)
                    } else {
                        if ($(e.target).hasClass("ncl-location-pin")) {
                            var index = $(e.target).attr("data-id");
                            target.locations.focus(index)
                        } else {
                            if ($(e.target).closest(".ncl-slider").length != 0) {
                                base.sliderFingerDown = true
                            } else {
                                if ($(e.target).hasClass("ncl-slider-zoomin")) {
                                    target.container.zoom_zoom_in()
                                } else {
                                    if ($(e.target).hasClass("ncl-slider-zoomout")) {
                                        target.container.zoom_zoom_out()
                                    } else {
                                        if ($(e.target).parent().hasClass("ncl-nav-move")) {
                                            var direction = $(e.target).attr("class").replace("ncl-move-", "");
                                            target.container.move(direction)
                                        } else {
                                            //161027 Add
                                            if ($(e.target).hasClass("ncl-location-close")) {
                                                $(".ncl-location-contents.ncl-active").removeClass("ncl-active").stop().fadeOut(250)
                                            }else{
                                                base.fingerDown = true

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return false
        }, false);
        document.addEventListener("touchmove", function(e) {
            if (base.fingerDown && !base.dragging && e.touches.length == 1) {
                e.preventDefault();
                base.dragging = true;
                target.container.drag_init(e.touches[0])
            } else {
                if (base.dragging && e.touches.length == 1) {
                    e.preventDefault();
                    target.container.drag_drag(e.touches[0])
                } else {
                    if (base.sliderFingerDown && !base.sliderDragging && e.touches.length == 1) {
                        e.preventDefault();
                        base.sliderDragging = true;
                        target.navigation.drag_init(e.touches[0])
                    } else {
                        if (base.sliderDragging && e.touches.length == 1) {
                            e.preventDefault();
                            target.navigation.drag_drag(e.touches[0])
                        } else {
                            if (base.twoFingersDown && !base.twoFingersDragging) {
                                e.preventDefault();
                                base.twoFingersDragging = true;
                                target.navigation.touch_init(e)
                            } else {
                                if (base.twoFingersDragging) {
                                    e.preventDefault();
                                    target.navigation.touch_drag(e)
                                }
                            }
                        }
                    }
                }
            }
            return false
        }, false);
        document.addEventListener("touchend", function(e) {
            if (base.fingerDown) {
                e.preventDefault();
                base.fingerDown = false
            }
            if (base.dragging) {
                e.preventDefault();
                base.dragging = false;
                target.container.drag_finish(e.touches[0])
            }
            if (base.sliderFingerDown) {
                e.preventDefault();
                base.sliderFingerDown = false
            }
            if (base.sliderDragging) {
                e.preventDefault();
                base.sliderDragging = false;
                target.navigation.drag_finish(e.touches[0])
            }
            if (base.twoFingersDown) {
                e.preventDefault();
                base.twoFingersDown = false;
                target.navigation.touch_finish()
            }
            if (base.twoFingersDragging) {
                e.preventDefault();
                base.twoFingersDragging = false;
                target.navigation.touch_zoom.finish()
            }
            return false
        }, false)
    };

    function Window() {}
    Window.prototype.init = function() {
        //console.log('Window init');
        var winW = $(window).height() || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        //resposibleSet(winW);
        var ori_winW = winW;
        $(window).on("resize.ncl", function() {
            //console.log('Window resize');
            winW = $(window).width();
            resposibleSet(ori_winW,winW);
        })
        var _isDestroy = false;
        function resposibleSet(_ori_winW,_winW){
            //console.log('_ori_winW'+_ori_winW+'\nwinW'+winW);
            if(_winW > 768){
                //console.log('here');
                target.wrapper.refresh();
                // target.container.go_at(target.container.focal_point.x * target.container.z, target.container.focal_point.y * target.container.z, true);
                target.container.go_at(_winW/2 + 100, 283, true);
                if (target.fullscreen.is_fullscreen) {
                    target.fullscreen.refresh()
                }
                if($('#network-map02').length > 0){
                    $('#network-map02').empty().remove();
                }
                _isDestroy = false;
            }else{
                //console.log('\n\n\n*****모바일*****\n\n\n');
                if (!_isDestroy) {
                    target.wrapper.destroy();
                    _isDestroy = true;
                }
            }
        }
    };

    $.fn.rmap = function(options) {
        var D = {
            width: "auto",
            height: "auto",
            image: {
                src: "../images/map.gif"
            },
            nav_ui: {
                show: true,
                autohide: false,
                move_ui: true,
                zoom_ui: true
            },
            menu: {
                show: true
            },
            animations: {
                move: true,
                inertia: true
            },
            zoom: {
                initial: 1,
                max: 5
            },
            fullscreen: {
                enabled: true,
                start_in_fullscreen: false
            }
        };
        O = $.extend(true, D, options);

        function normalize_options(options) {
            if (options.fullscreen) {
                options.width = "auto";
                options.height = "auto"
            }
            if (options.zoom.initial < 1) {
                options.zoom.initial = 1
            }
        }
        return this.each(function() {
            //console.log('each');
            var wrapper = new Wrapper(),
                container = new Container(),
                locations = new Locations(),
                menu = new Menu(),
                map = new Map(),
                navigation = new Navigation(),
                fullscreen = new Fullscreen(),
                autohide = new Autohide(),
                _mouse = new Mouse(),
                // _touch = new Touch(),
                _window = new Window();
            var el = $(this);
            var img = new Image();
            $(img).attr("src", O.image.src);
            img.onload = function() {
                O.image.width = img.width;
                O.image.height = img.height;
                el.addClass("ncl-root");
                target = {
                    el: el,
                    wrapper: wrapper,
                    container: container,
                    locations: locations,
                    menu: menu,
                    map: map,
                    navigation: navigation,
                    fullscreen: fullscreen,
                    autohide: autohide,
                    _mouse: _mouse,
                    // _touch: _touch,
                    _window: _window
                };
                target.wrapper.init();
                target.container.init();
                target.map.init();
                target.locations.init();
                if (O.nav_ui.show) {
                    target.navigation.init()
                }
                if (O.menu.show) {
                    target.menu.init()
                }
                if (O.fullscreen.enabled) {
                    target.fullscreen.init()
                }
                target._mouse.init();
                // if ("ontouchstart" in document.documentElement) {
                //     target._touch.init()
                // }
                target._window.init();
                if (O.fullscreen.start_in_fullscreen) {
                    target.fullscreen.enter()
                }
                if (O.zoom.initial > 1) {
                    target.container.zoom_zoom_at(O.zoom.initial);
                    target.navigation.update()
                }
                if (O.nav_ui.autohide) {
                    target.autohide.init()
                }
            }
        })
    }
})(jQuery);
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t + b
        }
        return c / 2 * ((t -= 2) * t * t + 2) + b
    }
})
