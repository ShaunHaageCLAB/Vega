<header class="site-header" id="site-header">	

	<div class="andrew_fairlie">
		<div class="navbar-brand-wrapper">
			<a class="navbar-brand" href="/">
				<video autoplay class="navbar-brand-logo ">
					<source src="img/vega-logo-1.mp4" type="video/mp4">
				</video>
			</a>
		</div>
		
		<button class="navbar-toggle / js-toggle-menu">
			<span class="sr-only">Toggle navigation</span>
			<i class="fa fa-bars" aria-hid	den="true"></i>
			<i class="fa fa-close" aria-hid	den="true"></i>
		</button>
	</div>
		

	<nav class="navbar-wrapper" id="site-navigation">

		<div class="navbar navbar-primary" id="primary-navigation">
			<div class="container">
				<ul class="navbar-nav level-1-list">
					<li class="is-active"><a  class="level-1-link" href="#">Enquire</a></li>
					<li class="visible-md-block visible-lg-block"><a  class="level-1-link" href="#">Apply</a></li>
					<li class="visible-md-block visible-lg-block"><a  class="level-1-link" href="#">Register</a></li>
					<li><a  class="level-1-link" href="#">My Vega</a></li>
				</ul>
			</div>
		</div>

		
		<div class="navbar navbar-secondary" id="secondary-navigation" data-menu='1'>
			<div class="container">
				<ul class="navbar-nav level-1-list">
					<li class="level-1-item">
						<a class="level-1-link / js-has-children" href="#">Who we are</a>
						<?php include("includes/dropdown/menu-4-columns.php"); ?>
					</li>
					<li class="level-1-item">
						<a class="level-1-link / js-has-children" href="#">Courses</a>					
						<?php include("includes/dropdown/menu-3-columns.php"); ?>
					</li>
					<li class="is-active"><a  class="level-1-link" href="#">Student Life</a></li>
					<li class="level-1-item"><a  class="level-1-link" href="#">Contact Us</a></li>
					<li class="level-1-item"><a  class="level-1-link" href="#">Admissions</a></li>
					<li class="level-1-item"><a  class="level-1-link" href="#">News and Events</a></li>
					<li class="toggle__search-wrapper">
						<button class="toggle__search js-toggle-search">
							<i class="fa fa-search" aria-hidden="true"></i>
							<i class="fa fa-close" aria-hidden="true"></i>
						</button>

						<div class="search-form__wrapper / form-inline">
							<label class="sr-only" for="search-website">Search the website</label>
							
							<input type="search" class="search-form__field / form-control" id="search-website" placeholder="Search the Website...">
							
							<button type="submit" class="search-form__button / btn btn-default">
								Search <i class="fa fa-search" aria-hidden="true"></i>
							</button>
						</div>						

					</li>
				</ul>
			</div>
		</div>

	</nav>


</header> 

