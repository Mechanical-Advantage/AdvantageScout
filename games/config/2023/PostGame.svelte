<script>
import Ratings from './Ratings.svelte';
</script>

<Ratings name="DriverRating"/>
<Ratings name="PlayingDefenseDuration"/>


<div class="rating ml-[100px]">
    <input type="radio" name="rating-1" class="rating-hidden" />
    <input type="radio" name="rating-1" class="mask mask-star"  />
    <input type="radio" name="rating-1" class="mask mask-star" />
    <input type="radio" name="rating-1" class="mask mask-star" />
    <input type="radio" name="rating-1" class="mask mask-star"  />
    <input type="radio" name="rating-1" class="mask mask-star"  />
</div>
