// Progressive Enhancement
if(navigator.serviceWorker){
	navigator.serviceWorker.register('sw.js').catch(console.error);
}
//its done..


require.config(sb4runtime.requiresetting);

require(["sb4core/init"], function(){

	require([ "axon" ], function() {

	});

});