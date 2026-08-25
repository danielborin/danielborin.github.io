// ============================================================
// CHIRIKOV STANDARD MAP
// Optimized animated phase-space visualization
//
// p_(n+1) = p_n + K sin(x_n)
// x_(n+1) = x_n + p_(n+1)  mod 2π
//
// The phase-space portrait is generated ONCE.
// Only the particles are animated afterwards.
// ============================================================

(function () {
  document.addEventListener('DOMContentLoaded', function () {

    var canvas = document.getElementById('phase-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var reduceMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    var W = canvas.width;
    var H = canvas.height;

    var PI = Math.PI;
    var TWO_PI = Math.PI * 2;


    // ========================================================
    // STANDARD MAP
    // ========================================================

    /*
     * This value gives a recognizable central island
     * surrounded by chaotic regions.
     */
    var K = 0.90;


    // ========================================================
    // PHASE SPACE
    // ========================================================

    var X_MIN = -PI;
    var X_MAX = PI;

    var P_MIN = -PI;
    var P_MAX = PI;


    // ========================================================
    // COLORS
    // ========================================================

    function accentColor() {

      return (
        getComputedStyle(
          document.documentElement
        )
          .getPropertyValue('--accent')
          .trim() ||
        '#2c4870'
      );
    }

    function accent2Color() {

      return (
        getComputedStyle(
          document.documentElement
        )
          .getPropertyValue('--accent2')
          .trim() ||
        '#3f7d63'
      );
    }


    // ========================================================
    // COORDINATES
    // ========================================================

    function screenX(x) {

      return (
        ((x - X_MIN) /
          (X_MAX - X_MIN)) *
        W
      );
    }


    function screenY(p) {

      return (
        H -
        ((p - P_MIN) /
          (P_MAX - P_MIN)) *
          H
      );
    }


    // ========================================================
    // PERIODIC X
    // ========================================================

    function wrapX(x) {

      while (x > PI) {
        x -= TWO_PI;
      }

      while (x < -PI) {
        x += TWO_PI;
      }

      return x;
    }


    // ========================================================
    // STANDARD MAP
    // ========================================================

    function standardMap(x, p) {

      var pNext =
        p + K * Math.sin(x);

      var xNext =
        x + pNext;

      xNext =
        wrapX(xNext);

      return {
        x: xNext,
        p: pNext
      };
    }


    // ========================================================
    // RANDOM GENERATOR
    // ========================================================

    function mulberry32(a) {

      return function () {

        a |= 0;

        a =
          (a + 0x6D2B79F5) |
          0;

        var t =
          Math.imul(
            a ^ (a >>> 15),
            1 | a
          );

        t =
          (t +
            Math.imul(
              t ^ (t >>> 7),
              61 | t
            )) ^
          t;

        return (
          ((t ^ (t >>> 14)) >>> 0) /
          4294967296
        );
      };
    }

    var rand =
      mulberry32(24681357);


    // ========================================================
    // OFFSCREEN PHASE-SPACE CANVAS
    // ========================================================
    //
    // This is the main performance improvement.
    //
    // We calculate the phase portrait once and then simply
    // copy it onto the visible canvas every frame.
    // ========================================================

    var phaseCanvas =
      document.createElement('canvas');

    phaseCanvas.width = W;
    phaseCanvas.height = H;

    var phaseCtx =
      phaseCanvas.getContext('2d');


    // ========================================================
    // GENERATE PHASE SPACE
    // ========================================================

    function generatePhaseSpace() {

      /*
       * Moderate density.
       *
       * This is intentionally MUCH smaller than the
       * previous 630,000-point version.
       */
      var orbitCount = 260;
      var iterations = 280;

      phaseCtx.clearRect(
        0,
        0,
        W,
        H
      );


      var ac =
        accentColor();

      var ac2 =
        accent2Color();


      // ------------------------------------------------------
      // SUBTLE GRID
      // ------------------------------------------------------

      phaseCtx.save();

      phaseCtx.strokeStyle =
        ac;

      phaseCtx.globalAlpha =
        0.035;

      phaseCtx.lineWidth =
        0.7;


      /*
       * Vertical grid.
       */
      for (
        var i = 0;
        i <= 8;
        i++
      ) {

        var gx =
          (i / 8) * W;

        phaseCtx.beginPath();

        phaseCtx.moveTo(
          gx,
          0
        );

        phaseCtx.lineTo(
          gx,
          H
        );

        phaseCtx.stroke();
      }


      /*
       * Horizontal grid.
       */
      for (
        var j = 0;
        j <= 8;
        j++
      ) {

        var gy =
          (j / 8) * H;

        phaseCtx.beginPath();

        phaseCtx.moveTo(
          0,
          gy
        );

        phaseCtx.lineTo(
          W,
          gy
        );

        phaseCtx.stroke();
      }

      phaseCtx.restore();


      // ------------------------------------------------------
      // PHASE-SPACE TRAJECTORIES
      // ------------------------------------------------------

      phaseCtx.save();

      /*
       * We draw directly onto the offscreen canvas.
       * Nothing is stored in an enormous array.
       */

      for (
        var orbit = 0;
        orbit < orbitCount;
        orbit++
      ) {

        var x =
          -PI +
          rand() *
            TWO_PI;

        var p =
          P_MIN +
          rand() *
            (P_MAX - P_MIN);


        /*
         * Transient.
         */
        for (
          var t = 0;
          t < 40;
          t++
        ) {

          var q =
            standardMap(
              x,
              p
            );

          x = q.x;
          p = q.p;


          /*
           * Restart escaped trajectories.
           */
          if (
            p < P_MIN ||
            p > P_MAX
          ) {

            x =
              -PI +
              rand() *
                TWO_PI;

            p =
              P_MIN +
              rand() *
                (P_MAX - P_MIN);
          }
        }


        /*
         * Draw actual standard-map points.
         */
        for (
          var n = 0;
          n < iterations;
          n++
        ) {

          var next =
            standardMap(
              x,
              p
            );

          x =
            next.x;

          p =
            next.p;


          /*
           * Only draw points inside the visible window.
           */
          if (
            p >= P_MIN &&
            p <= P_MAX
          ) {

            var px =
              screenX(x);

            var py =
              screenY(p);


            /*
             * Main phase-space color.
             */
            phaseCtx.fillStyle =
              ac;

            phaseCtx.globalAlpha =
              0.10;


            phaseCtx.fillRect(
              px,
              py,
              0.9,
              0.9
            );

          } else {

            /*
             * Restart.
             */
            x =
              -PI +
              rand() *
                TWO_PI;

            p =
              P_MIN +
              rand() *
                (P_MAX - P_MIN);
          }
        }
      }

      phaseCtx.restore();


      // ------------------------------------------------------
      // CENTRAL AXES
      // ------------------------------------------------------

      phaseCtx.save();

      phaseCtx.strokeStyle =
        ac;

      phaseCtx.globalAlpha =
        0.045;

      phaseCtx.lineWidth =
        0.7;


      var zeroX =
        screenX(0);

      var zeroY =
        screenY(0);


      phaseCtx.beginPath();

      phaseCtx.moveTo(
        zeroX,
        0
      );

      phaseCtx.lineTo(
        zeroX,
        H
      );

      phaseCtx.stroke();


      phaseCtx.beginPath();

      phaseCtx.moveTo(
        0,
        zeroY
      );

      phaseCtx.lineTo(
        W,
        zeroY
      );

      phaseCtx.stroke();


      phaseCtx.restore();
    }


    // Generate once.
    generatePhaseSpace();


    // ========================================================
    // PARTICLES
    // ========================================================

    var particleCount = 38;

    var particles = [];


    function createParticle() {

      var x;
      var p;


      /*
       * Half start around the central regular region.
       */
      if (
        rand() < 0.50
      ) {

        var angle =
          rand() *
          TWO_PI;

        var radius =
          0.10 +
          rand() *
            0.70;

        x =
          Math.cos(angle) *
          radius;

        p =
          Math.sin(angle) *
          radius;

      } else {

        x =
          -PI +
          rand() *
            TWO_PI;

        p =
          P_MIN +
          rand() *
            (P_MAX - P_MIN);
      }


      var next =
        standardMap(
          x,
          p
        );


      return {

        x: x,
        p: p,

        nextX:
          next.x,

        nextP:
          next.p,

        alpha:
          rand(),

        speed:
          0.00020 +
          rand() *
            0.00018,

        radius:
          rand() < 0.15
            ? 1.6
            : 1.0,

        trail: [],

        trailLength:
          6 +
          Math.floor(
            rand() * 7
          ),

        color:
          rand() < 0.55
            ? 0
            : 1,

        renderX: x,
        renderP: p
      };
    }


    for (
      var i = 0;
      i < particleCount;
      i++
    ) {

      particles.push(
        createParticle()
      );
    }


    // ========================================================
    // ADVANCE PARTICLE
    // ========================================================

    function advanceParticle(
      particle,
      delta
    ) {

      particle.alpha +=
        delta *
        particle.speed;


      /*
       * Complete map iterations.
       */
      while (
        particle.alpha >= 1
      ) {

        particle.alpha -= 1;


        /*
         * Advance to the actual next point.
         */
        particle.x =
          particle.nextX;

        particle.p =
          particle.nextP;


        /*
         * p is not wrapped.
         *
         * If it leaves the visible window,
         * start a new orbit.
         */
        if (
          particle.p < P_MIN ||
          particle.p > P_MAX
        ) {

          var fresh =
            createParticle();

          particle.x =
            fresh.x;

          particle.p =
            fresh.p;

          particle.nextX =
            fresh.nextX;

          particle.nextP =
            fresh.nextP;

          particle.alpha =
            fresh.alpha;

          particle.trail = [];

          continue;
        }


        /*
         * Calculate next point using the standard map.
         */
        var next =
          standardMap(
            particle.x,
            particle.p
          );

        particle.nextX =
          next.x;

        particle.nextP =
          next.p;
      }


      // ------------------------------------------------------
      // SMOOTH VISUAL INTERPOLATION
      // ------------------------------------------------------

      var t =
        particle.alpha;

      t =
        t * t *
        (3 - 2 * t);


      /*
       * Periodic x interpolation.
       */
      var dx =
        particle.nextX -
        particle.x;

      if (
        dx > PI
      ) {
        dx -= TWO_PI;
      }

      if (
        dx < -PI
      ) {
        dx += TWO_PI;
      }


      particle.renderX =
        wrapX(
          particle.x +
            dx * t
        );


      particle.renderP =
        particle.p +
        (
          particle.nextP -
          particle.p
        ) *
          t;


      /*
       * Short trail.
       */
      particle.trail.push({
        x:
          particle.renderX,

        p:
          particle.renderP
      });


      if (
        particle.trail.length >
        particle.trailLength
      ) {

        particle.trail.shift();
      }
    }


    // ========================================================
    // DRAW PARTICLES
    // ========================================================

    function drawParticles(
      ac,
      ac2
    ) {

      particles.forEach(
        function (particle) {

          var color =
            particle.color === 0
              ? ac
              : ac2;


          /*
           * Trail.
           */
          if (
            particle.trail.length >
            1
          ) {

            ctx.beginPath();


            for (
              var i = 0;
              i <
              particle.trail.length;
              i++
            ) {

              var point =
                particle.trail[i];

              var px =
                screenX(
                  point.x
                );

              var py =
                screenY(
                  point.p
                );


              if (
                i === 0
              ) {

                ctx.moveTo(
                  px,
                  py
                );

              } else {

                ctx.lineTo(
                  px,
                  py
                );
              }
            }


            ctx.strokeStyle =
              color;

            ctx.globalAlpha =
              0.15;

            ctx.lineWidth =
              0.7;

            ctx.stroke();
          }


          /*
           * Position.
           */
          var x =
            screenX(
              particle.renderX
            );

          var y =
            screenY(
              particle.renderP
            );


          /*
           * Glow.
           */
          ctx.fillStyle =
            color;

          ctx.globalAlpha =
            0.18;

          ctx.beginPath();

          ctx.arc(
            x,
            y,
            particle.radius * 3,
            0,
            TWO_PI
          );

          ctx.fill();


          /*
           * Ball.
           */
          ctx.globalAlpha =
            0.90;

          ctx.beginPath();

          ctx.arc(
            x,
            y,
            particle.radius,
            0,
            TWO_PI
          );

          ctx.fill();
        }
      );


      ctx.globalAlpha = 1;
    }


    // ========================================================
    // MAIN ANIMATION
    // ========================================================

    var lastTime =
      performance.now();


    function draw(time) {

      var delta =
        time -
        lastTime;


      /*
       * Protect against huge time jumps.
       */
      if (
        delta > 80
      ) {
        delta = 16;
      }


      lastTime =
        time;


      ctx.clearRect(
        0,
        0,
        W,
        H
      );


      /*
       * ------------------------------------------------------
       * COPY PRECOMPUTED PHASE SPACE
       * ------------------------------------------------------
       *
       * This operation is extremely cheap compared with
       * recalculating hundreds of thousands of points.
       */
      ctx.drawImage(
        phaseCanvas,
        0,
        0
      );


      /*
       * ------------------------------------------------------
       * UPDATE PARTICLES
       * ------------------------------------------------------
       */

      if (
        !reduceMotion
      ) {

        particles.forEach(
          function (particle) {

            advanceParticle(
              particle,
              delta
            );
          }
        );

      } else {

        particles.forEach(
          function (particle) {

            particle.renderX =
              particle.x;

            particle.renderP =
              particle.p;
          }
        );
      }


      /*
       * ------------------------------------------------------
       * DRAW MOVING ORBITS
       * ------------------------------------------------------
       */

      drawParticles(
        accentColor(),
        accent2Color()
      );
    }


    // ========================================================
    // START
    // ========================================================

    if (
      reduceMotion
    ) {

      draw(0);

    } else {

      function loop(time) {

        draw(time);

        requestAnimationFrame(
          loop
        );
      }

      requestAnimationFrame(
        loop
      );
    }

  });
})();