
if [ "$SCHEDULER_MANAGER" = "static" ]
then
	celery -A config worker -l info --beat
elif [ "$SCHEDULER_MANAGER" != "dynamic" ]
then
	celery -A config worker -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
else
    celery -A config worker -l info
fi


