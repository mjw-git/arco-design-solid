# 启动组件开发服务
pnpm dev:components &

# 等待组件服务启动（30秒超时）
max_attempts=30
attempt=0
while [ $attempt -lt $max_attempts ]; do
  if lsof -i :3000 >/dev/null 2>&1; then
    echo "组件开发服务已启动，端口 3000 可用"
    break
  fi
  attempt=$((attempt + 1))
  echo "等待组件开发服务启动... ($attempt/$max_attempts)"
  sleep 1
done

if [ $attempt -eq $max_attempts ]; then
  echo "警告：组件开发服务可能未完全启动，但将继续执行"
fi

# 启动文档服务
pnpm dev:docs