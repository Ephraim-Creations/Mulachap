document.addEventListener('DOMContentLoaded', function() {
    // Milestones data with target values
    const milestones = [
        { 
            element: '.milestone:nth-child(1) .number', 
            target: 10,
            prefix: '', 
            suffix: '',
            duration: 2000 // 2 seconds per cycle
        },
        { 
            element: '.milestone:nth-child(2) .number', 
            target: 800,
            prefix: '', 
            suffix: '+',
            duration: 2000
        },
        { 
            element: '.milestone:nth-child(3) .number', 
            target: 100 ,
            prefix: 'Ksh ', 
            suffix: 'M+',
            duration: 2000
        }
    ];

    // Format number with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Animate counting with reset
    function animateWithReset(milestone) {
        const element = document.querySelector(milestone.element);
        if (!element) return;

        let startTime;
        let isCountingUp = true;
        let currentValue = 0;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / milestone.duration;
            
            if (isCountingUp) {
                // Counting up phase
                currentValue = Math.min(progress * milestone.target, milestone.target);
                if (progress >= 1) {
                    // Switch to pause at top
                    isCountingUp = false;
                    startTime = timestamp;
                }
            } else {
                // Pause at top phase (1 second)
                if (progress >= 0.5) { // 1s pause (half of duration)
                    // Reset to zero
                    currentValue = 0;
                    isCountingUp = true;
                    startTime = timestamp;
                }
            }

            // Update display
            if (milestone.target >= 1000) {
                element.textContent = milestone.prefix + formatNumber(Math.floor(currentValue)) + milestone.suffix;
            } else {
                element.textContent = milestone.prefix + Math.floor(currentValue) + milestone.suffix;
            }

            requestAnimationFrame(animate);
        }

        // Start animation when section is visible
        const observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                requestAnimationFrame(animate);
            }
        }, { threshold: 0.5 });

        const container = document.querySelector('.milestones');
        if (container) observer.observe(container);
    }

    // Initialize all counters
    milestones.forEach(animateWithReset);
});

