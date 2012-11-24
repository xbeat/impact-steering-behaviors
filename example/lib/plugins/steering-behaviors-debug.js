/*
 * steering-behaviors-debug
 * https://github.com/hurik/impact-steering-behaviors
 *
 * BETA
 *
 * IMPORTANT:
 * You need this plugins:
 * line-of-sight - https://github.com/hurik/impact-line-of-sight
 * vec2          - https://github.com/hurik/impact-vec2
 *
 * Andreas Giemza
 * andreas@giemza.net
 * http://www.hurik.de/
 *
 * This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/.
 *
 * Credits:
 * "Programming Game AI by Example" by Mat Buckland (http://www.jblearning.com/Catalog/9781556220784/student/)
 *
 */

ig.module( 
	'plugins.steering-behaviors-debug' 
)
.requires(
	'impact.debug.menu',
	'impact.entity'
)
.defines(function(){

ig.Entity.inject({
	draw: function() {
		this.parent();

		if(ig.Entity._wander && this.wanderActive) {
			var vCircleCenter = this.vHeading.clone().scale(this.wanderDistance).add(this.vEntityCenter);
			var vMovementPointer = ig.Vec2.sum(vCircleCenter, this.vWanderTargert);

			this._drawLine(this.vEntityCenter, vCircleCenter, 1, 255, 0, 0, 0.5);
			this._drawCircle(vCircleCenter, this.wanderRadius, 1, 255, 0, 0, 0.5);
			this._drawCircle(vMovementPointer, 1, 2, 255, 0, 0, 0.5);
		}
	},

	_drawCircle: function(vect, radius, width, r, g, b, a) {
		ig.system.context.strokeStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
		ig.system.context.lineWidth = width;

		ig.system.context.beginPath();
		ig.system.context.arc(ig.system.getDrawPos(vect.x - ig.game.screen.x), ig.system.getDrawPos(vect.y - ig.game.screen.y), radius * ig.system.scale, 0, Math.PI * 2);
		ig.system.context.stroke();
	},

	_drawLine: function(vect1, vect2, width, r, g, b, a) {
		ig.system.context.strokeStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
		ig.system.context.lineWidth = width;

		ig.system.context.beginPath();
		ig.system.context.moveTo(
		ig.system.getDrawPos(vect1.x - ig.game.screen.x), ig.system.getDrawPos(vect1.y - ig.game.screen.y));
		ig.system.context.lineTo(
		ig.system.getDrawPos(vect2.x - ig.game.screen.x), ig.system.getDrawPos(vect2.y - ig.game.screen.y));
		ig.system.context.stroke();
		ig.system.context.closePath();
	}
});

ig.Entity._wander = false;

ig.debug.addPanel({
	type: ig.DebugPanel,
	name: 'steering-behaviors-debug',
	label: 'Steering Behaviors',

	options: [{
		name: 'Wander',
		object: ig.Entity,
		property: '_wander'
	}]
});

});
