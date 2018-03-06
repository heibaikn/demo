<?php
$callback=$_GET['callback'];
$arr = array(1,2);
$arr[2]=$callback;
//$callback方法名(json数据)
echo $callback.'('.json_encode($arr).')';