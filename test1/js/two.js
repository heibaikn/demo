    /*绘画动作*/
    beginStroke:function(point){

        Fields.isMouseDown = true
        //console.log("mouse down!")
        Fields.lastLoc = windowToCanvas(point.x, point.y)
        Fields.lastTimestamp = new Date().getTime();
    }
    endStroke:function(){
        Fields.isMouseDown = false
    }
    moveStroke:function(point){

        var curLoc = windowToCanvas( point.x , point.y );
        var curTimestamp = new Date().getTime();
        var s = calcDistance( curLoc , Fields.lastLoc )
        var t = curTimestamp - Fields.lastTimestamp

        var lineWidth = calcLineWidth( t , s );

        //draw
        context.beginPath();
        context.moveTo( Fields.lastLoc.x , Fields.lastLoc.y );
        context.lineTo( curLoc.x , curLoc.y );

        context.strokeStyle = strokeColor
        context.lineWidth = lineWidth
        context.lineCap = "round"   //lineCap 帽子
        context.lineJoin = "round"  // 线条的过度
        context.stroke()

        Fields.lastLoc = curLoc
        Fields.lastTimestamp = curTimestamp
        lastLineWidth = lineWidth
    }