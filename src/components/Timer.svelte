<script>
        export function timer(node) {
		
        const interval = setInterval(() => {
              node.dispatchEvent(new CustomEvent('timer', {
                  detail: new Date()
              }));
          }, 1000);
          
          return {
              destroy() {
                  clearInterval(interval);
              }
          }
   }
  
</script>
