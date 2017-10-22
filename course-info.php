<?php include("includes/sharepoint/head.php"); ?>
<?php include("includes/template/head.php"); ?>
<title>Course Information</title>
<?php include("includes/sharepoint/header.php"); ?>


<?php include("includes/course-info/banner.php"); ?>

<div class="container / theme-teal">
<!-- 
Colour themes : see _colour-themes.scss
<div class="container / theme-orange">
<div class="container / theme-magebta">
<div class="container / theme-green"> 
-->

	<div class="row">
		<div class="col-lg-8 col-md-8">
			<h2 class="course__title / h3-light">BCom Digital Marketing Degree | Digital Marketing</h2>
			<p class="course__sub-title / text-gray baseline-sm">3 years full-time | NQF level 7 | 370 credits | saqa id: 90742</p>
		</div>
		<a href="#" class="btn-course-info / col-lg-2 col-md-2 col-sm-6 / btn baseline-xs">Enquire Now</a>
		<a href="#" class="btn-course-info / col-lg-2 col-md-2 col-sm-6 / btn baseline-xs">Apply</a>
	</div>

	<div class="row baseline-md">
		<div class="col-lg-8 col-md-8">
			<?php include("includes/course-info/accordian.php"); ?>
		</div>
		<div class="col-lg-4 col-md-4">
			<?php include("includes/course-info/sidebar.php"); ?>
		</div>
	</div>

	<?php include("includes/course-info/menu.php"); ?>	

</div>




<?php include("includes/sharepoint/footer.php"); ?>